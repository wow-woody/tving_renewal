// TODO 약관 동의 인풋 이벤트
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

// TODO 프로필 생성 타입
export interface Profile {
  id: string;
  name: string;
  owner: boolean;
  image: string;
  createdAt: Date;
}
