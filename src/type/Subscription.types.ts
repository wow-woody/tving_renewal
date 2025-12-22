// 가격
export interface Price {
    discount: number;
    original?: number;
}

// 이용권 등급 (선택이지만 있으면 좋음)
export type SubscriptionGrade = 'slim' | 'basic' | 'standard' | 'ad-standard' | 'premium';

// 이용권(상품)
export interface SubscriptionItem {
    id: string;
    name: string;
    grade: SubscriptionGrade;
    companies: string[]; // 포함 서비스 (로직/필터용)
    companyIcon: string | string[]; // 아이콘
    price: Price;
    description: string[]; // + 로 나열할 텍스트
}

// 섹션 (티빙 / 티빙+웨이브 / 티빙+웨이브+애플TV)
export interface SubscriptionSection {
    id: string;
    title: string;
    services: string[]; // 섹션 대표 서비스 조합
    items: SubscriptionItem[];
}

// 전체 데이터
export interface SubscriptionData {
    sections: SubscriptionSection[];
}
