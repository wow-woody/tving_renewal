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

export interface Subscription {
    name: string;
    features: string[];
    logos: string[];
    item: SubscriptionItem; // 나중에 item 타입 명확히 해도 좋아요
    startedAt: string; // ISO string
    expiresAt: string; // ISO string
}

export interface SubscriptionItem {
    id: string;
    price: {
        original: number;
        discount: number;
    };
    name: string;
}
