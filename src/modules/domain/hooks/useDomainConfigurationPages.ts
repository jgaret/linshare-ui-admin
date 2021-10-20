import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useLegacyFeatures from '@/core/hooks/useLegacyFeatures';
import { getMainPages, canAccessPage, DomainManagementPage } from '../helpers/domainPageManagement';

export default function useDomainConfigurationPages () {
  const { t } = useI18n();
  const store = useStore();
  const { push } = useRouter();
  const { redirect } = useLegacyFeatures();
  const domainType = computed(() => store.getters['Domain/getCurrentDomainType']);
  const loggedUserRole = computed(() => store.getters['Auth/getLoggedUserRole']);

  const pages = computed(() => getMainPages()
    .filter(page => canAccessPage(page, loggedUserRole.value, domainType.value))
    .sort((a, b) => {
      if (!a.route) return 1;

      return t(a.title).localeCompare(t(b.title));
    })
  );

  function goToPage (page: DomainManagementPage) {
    if (page.legacy) {
      return redirect(page.title);
    }

    if (page.route) {
      push(page.route);
    }
  }

  return {
    goToPage,
    pages
  };
}
