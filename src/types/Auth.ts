// TODO 약관 동의 인풋 이벤트
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

// TODO 프로필 생성 타입
export interface Profile {
    id: string;
    name: string;
    owner: boolean;
    image: string;
    createdAt: Date;

    subscription?: Subscription;
}


export type SubscriptionStatus = 'active' | 'canceled' | 'expired';

export interface Subscription {
  id: string;
  name: string;
  grade?: string;
  companies?: string[];
  price: number;
  description: string[];

  startedAt: string;
  expiresAt: string;        // ✅ 1년 만료(계약/구독기간)
  subscribedAt?: string;

  // 상태 기반 취소 플로우
  status: SubscriptionStatus;
  canceledAt?: string;          // ✅ 해지 신청일(누른 날짜)
  cancelEffectiveAt?: string;   // ✅ 표시용 종료일(예: 이번달 말)

  // (선택) 나중 확장용
  paymentCycle?: 'monthly';

  // ✅ (기존 코드 호환용)
  logos?: string[];
  item?: SubscriptionItem;
}

export interface SubscriptionItem {
    id: string;
    price: {
        original: number;
        discount: number;
    };
    name: string;
}
