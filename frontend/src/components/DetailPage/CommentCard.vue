<script setup lang="ts">
import { Avatar, AvatarProps } from "ant-design-vue";
import { computed } from "vue";

type CommentType = {
  userName: string;
  userProfile: string;
  message: string;
  created_at: string;
};

const { userName, userProfile, message, created_at } = defineProps<CommentType>();

const commentAvatarProps = computed<AvatarProps>(() => ({
  src: userProfile || undefined,
  shape: "square",
  class: "select-none",
  size: 32,
}));
</script>

<template>
  <div class="flex gap-3 p-2 hover:bg-gray-50 rounded-lg">
    <div class="flex-shrink-0">
      <Avatar v-if="userProfile" v-bind="commentAvatarProps" />
      <Avatar v-else shape="square" :size="32">{{ userName?.slice(0, 2) }}</Avatar>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-sm font-semibold text-gray-800">{{ userName }}</span>
        <span class="text-xs text-gray-400">{{ created_at }}</span>
      </div>
      <p class="text-sm text-gray-600 break-words">{{ message }}</p>
    </div>
  </div>
</template>
