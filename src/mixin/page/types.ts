import Vue from 'vue';
import { Queries } from '@/utils/urls';
// import { GetLoader } from '@/utils/useGet';
// import { Page } from '@/models';

export interface PageState {
  loading: boolean;
  error: string;
  rows: unknown[] | null;
  total: number | null;
  size: number;
  // start at 1
  current: number;
  reload: () => void;
  // loader: GetLoader<Page<unknown>>;
}

export interface PageOptions {
  url: string;
  defaultSize?: number;
  query?: (this: Vue, queries: Record<string, string | (string | null)[]>) => Queries;
}
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    page?: PageOptions;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $page: PageState;
  }
}
