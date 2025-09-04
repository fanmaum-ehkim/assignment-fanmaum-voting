export interface UserAccessJwtPayload {
  userId: bigint;
}

export interface UserRefreshJwtPayload {
  userId: bigint;
  jti: string;
}
