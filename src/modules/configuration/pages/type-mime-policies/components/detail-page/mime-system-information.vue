<template>
  <div class="system-informations">
    <h3 class="section-title">{{ $t('MIME_POLICIES.SYSTEM_INFORMATIONS') }}</h3>
    <div class="info-block">
      <GlobeIcon class="system-icon"></GlobeIcon>
      <div>
        <div class="title">{{ $t('GENERAL.DOMAIN') }}</div>
        <div class="value">
          <router-link :to="{ name: 'ConfigurationDomainDetail', params: { domainUuid: domainUuid } }">
            <a href="">{{ item?.domainName }}</a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="info-block">
      <CalendarIcon class="system-icon"></CalendarIcon>
      <div>
        <div class="title">{{ $t('GENERAL.CREATION_DATE') }}</div>
        <div class="value">
          {{ $d(item?.creationDate ?? 0, 'mediumDate') }}
        </div>
      </div>
    </div>
    <div class="info-block">
      <CalendarIcon class="system-icon"></CalendarIcon>
      <div>
        <div class="title">{{ $t('GENERAL.MODIFICATION_DATE') }}</div>
        <div class="value">
          {{ $d(item?.modificationDate ?? 0, 'mediumDate') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import GlobeIcon from '@/core/components/icons/globe-icon.vue';
import CalendarIcon from '@/core/components/icons/calendar-icon.vue';
import { MimePolicy } from '@/modules/configuration/pages/type-mime-policies/types/MimeType';

const route = useRoute();

const props = defineProps<{
  item: MimePolicy | undefined;
}>();

const domainUuid = computed(() => {
  return props.item?.domainId ?? route?.params?.domainUuid;
});
</script>
<style lang="less">
.system-informations {
  border-radius: 12px;
  background-color: #fafafa;
  padding: 16px;

  .title {
    color: #6d7885;
  }
}

.info-block {
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

.system-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: #6d7885;
}

.section-title {
  margin-bottom: 15px;
  color: #434657;
}
</style>
