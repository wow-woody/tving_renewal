import type { SubscriptionData } from '../type/Subscription.types';

export const subscriptionData: SubscriptionData = {
    sections: [
        /**
         * ======================
         * 티빙 단독
         * ======================
         */
        {
            id: 'tving_only',
            title: '티빙 이용권',
            services: ['TVING'],
            items: [
                {
                    id: 'tving_ad_standard',
                    name: '티빙 광고형 스텐다드',
                    grade: 'ad-standard',
                    companies: ['TVING'],
                    companyIcon: '/images/tving-icon.svg',
                    price: {
                        discount: 5500,
                        // original: '',
                    },
                    description: ['동시시청 2대', '고화질', '모든 디바이스', '광고 포함'],
                },
                {
                    id: 'tving_premium',
                    name: '티빙 프리미엄',
                    grade: 'premium',
                    companies: ['TVING'],
                    companyIcon: '/images/tving-icon.svg',
                    price: {
                        discount: 17000,
                        // original: '',
                    },
                    description: ['동시시청 4대', '고화질', '모든 디바이스', 'Apple TV 제공'],
                },
                {
                    id: 'tving_standard',
                    name: '티빙 스텐다드',
                    grade: 'standard',
                    companies: ['TVING'],
                    companyIcon: '/images/tving-icon.svg',
                    price: {
                        discount: 13500,
                        // original: '',
                    },
                    description: ['동시시청 2대', '고화질', '모든 디바이스'],
                },
                {
                    id: 'tving_basic',
                    name: '티빙 베이직',
                    grade: 'basic',
                    companies: ['TVING'],
                    companyIcon: '/images/tving-icon.svg',
                    price: {
                        discount: 9500,
                        // original: '',
                    },
                    description: ['동시시청 1대', '일반화질', '모든 디바이스'],
                },
            ],
        },

        /**
         * ======================
         * 티빙 + 웨이브
         * ======================
         */
        {
            id: 'tving_wavve',
            title: '티빙 + 웨이브 이용권',
            services: ['TVING', 'WAVVE'],
            items: [
                {
                    id: 'tving_wavve_standard',
                    name: '더블 광고형 스탠다드',
                    grade: 'ad-standard',
                    companies: ['TVING', 'WAVVE'],
                    companyIcon: ['/images/tving-icon.svg', '/images/wave-icon.svg'],
                    price: {
                        discount: 7000,
                        original: 11000,
                    },
                    description: [
                        '동시시청 2대',
                        '티빙 고화질 / 웨이브 FHD',
                        // '웨이브 FHD',
                        '모든 디바이스',
                        '광고 포함',
                    ],
                },
                {
                    id: 'tving_wavve_premium',
                    name: '더블 프리미엄',
                    grade: 'premium',
                    companies: ['TVING', 'WAVVE'],
                    companyIcon: ['/images/tving-icon.svg', '/images/wave-icon.svg'],
                    price: {
                        discount: 19500,
                        original: 30000,
                    },
                    description: [
                        '동시시청 4대',
                        '티빙 고화질 / 웨이브 최고화질',
                        // '웨이브 최고화질',
                        '모든 디바이스',
                        'Apple TV 제공',
                    ],
                },
                {
                    id: 'tving_wavve_standard',
                    name: '더블 스텐다드',
                    grade: 'standard',
                    companies: ['TVING', 'WAVVE'],
                    companyIcon: ['/images/tving-icon.svg', '/images/wave-icon.svg'],
                    price: {
                        discount: 15000,
                        original: 24400,
                    },
                    description: [
                        '동시시청 2대',
                        '티빙 고화질 / 웨이브 FHD',
                        // '웨이브 FHD',
                        '모든 디바이스',
                    ],
                },
                {
                    id: 'tving_wavve_basic',
                    name: '더블 베이직',
                    grade: 'basic',
                    companies: ['TVING', 'WAVVE'],
                    companyIcon: ['/images/tving-icon.svg', '/images/wave-icon.svg'],
                    price: {
                        discount: 13500,
                        original: 17400,
                    },
                    description: [
                        '동시시청 1대',
                        '티빙 일반화질 / 웨이브 HD',
                        // '웨이브 HD',
                        '모든 디바이스',
                    ],
                },
                {
                    id: 'tving_wavve_slim',
                    name: '더블 슬림',
                    grade: 'slim',
                    companies: ['TVING', 'WAVVE'],
                    companyIcon: ['/images/tving-icon.svg', '/images/wave-icon.svg'],
                    price: {
                        discount: 9500,
                        original: 13400,
                    },
                    description: [
                        '동시시청 1대',
                        '티빙 고화질 / 웨이브 HD',
                        // '웨이브 HD',
                        '모든 디바이스',
                        '광고포함',
                    ],
                },
            ],
        },

        /**
         * ======================
         * 티빙 + 웨이브 + 애플TV
         * ======================
         */
        {
            id: 'tving_wavve_disney',
            title: '티빙 + 웨이브 + 디즈니 이용권',
            services: ['TVING', 'WAVVE', 'DISNEY'],
            items: [
                {
                    id: 'tving_wave_apple_3pack',
                    name: '3PACK',
                    grade: 'premium',
                    companies: ['TVING', 'WAVVE', 'DISNEY'],
                    companyIcon: [
                        '/images/tving-icon.svg',
                        '/images/diseny-icon.svg',
                        '/images/wave-icon.svg',
                    ],
                    price: {
                        discount: 21500,
                        original: 34300,
                    },
                    description: [
                        '동시시청 2대',
                        '티빙 고화질',
                        '디즈니 FHD / 웨이브 FHD',
                        // '웨이브 FHD',
                        '모든 디바이스',
                    ],
                },
                {
                    id: 'tving_wave_apple_double',
                    name: '더블(디즈니+)',
                    grade: 'premium',
                    companies: ['TVING', 'WAVVE', 'DISNEY'],
                    companyIcon: [
                        '/images/tving-icon.svg',
                        '/images/diseny-icon.svg',
                        // '/images/wave-icon.svg',
                    ],
                    price: {
                        discount: 18000,
                        original: 23400,
                    },
                    description: ['동시시청 2대', '티빙 고화질', '디즈니 FHD', '모든 디바이스'],
                },
            ],
        },
    ],
};
