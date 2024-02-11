import { type APIContext } from 'astro';
import { api } from './api.ts';

export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  password: string;
  isEnabled: boolean;
  authProvider: 'github' | 'google' | 'email' | 'linkedin';
  metadata: Record<string, any>;
  calculatedStats: {
    activityCount: number;
    totalVisitCount: number;
    longestVisitStreak: number;
    currentVisitStreak: number;
    updatedAt: Date;
  };
  verificationCode: string;
  resetPasswordCode: string;
  isSyncedWithSendy: boolean;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resetPasswordCodeAt: Date;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserActivityCount = {
  activityCount: Record<string, number>;
  totalActivityCount: number;
};

type ProgressResponse = {
  updatedAt: string;
  title: string;
  id: string;
  learning: number;
  skipped: number;
  done: number;
  total: number;
  isCustomResource?: boolean;
  roadmapSlug?: string;
};

export type UserResourceProgressStats = {
  done: {
    total: number;
  };
  learning: {
    total: number;
    roadmaps: ProgressResponse[];
    bestPractices: ProgressResponse[];
  };
};

export type GetUserByUsernameResponse = Omit<
  UserDocument,
  | 'password'
  | 'verificationCode'
  | 'resetPasswordCode'
  | 'resetPasswordCodeAt'
  | 'email'
> &
  UserResourceProgressStats & {
    activity: UserActivityCount;
  };

export function userApi(context: APIContext) {
  return {
    getUserByUsername: async function (username: string) {
      return api(context).get<GetUserByUsernameResponse>(
        `${import.meta.env.PUBLIC_API_URL}/v1-get-user-by-username/${username}`,
      );
    },
  };
}
