// Shapes the client consumes from the backend API.

export interface GoogleProfile {
  displayName: string;
}

export interface UserResponse {
  _id: string;
  google: GoogleProfile;
  avatar?: string;
  role?: string;
}

export interface ProfileResponse {
  _id: string;
  name: string;
  birthday?: string;
  nickname?: string;
}

// A tag reference embedded in moments and feed entries.
export interface TagRef {
  name: string;
}

// Option shape used by react-select in the tag picker.
export interface TagOption {
  value: string;
  label?: string;
}

export interface AssetResponse {
  _id: string;
  name: string;
}

export interface MomentResponse {
  _id: string;
  text: string;
  takenAt: string;
  tags?: TagRef[];
  assets?: AssetResponse[];
}

// A single entry from the tag timeline endpoint: either an asset or a moment.
export interface TimelineEntry {
  id: string;
  asset?: AssetResponse;
  moment?: MomentResponse;
  tags?: TagRef[];
}

// A paginated list envelope returned by the feed/timeline endpoints.
export interface PageResponse<T> {
  objects: T[];
  page: number;
  pages?: number;
  total?: number;
}
