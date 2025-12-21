export interface LiveChannel {
    id: string;
    title: string;
    thumb: string;
    isFree: boolean;
    category: "뉴스" | "스포츠" | "예능" | "드라마";
    iframe: string;
    state?: 'mylive';
}

export const liveChannels: LiveChannel[] = [
    {
        id: 'z1',
        title: "모닝와이드 ",
        thumb: "https://img.youtube.com/vi/EfHTThUGZIc/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe
        width="100%"
        height="560"
        src="https://www.youtube.com/embed/EfHTThUGZIc?autoplay=1&mute=1&controls=0"
        title="YTN LIVE"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `,
    },

    {
        id: 'z2',
        title: "연합뉴스",
        thumb: "https://img.youtube.com/vi/6QZ_qc75ihU/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/6QZ_qc75ihU?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z3',
        title: "KBS 뉴스",
        thumb: "https://img.youtube.com/vi/M1WrMEUOBsU/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        state: 'mylive',
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/M1WrMEUOBsU?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z4',
        title: "MBC 뉴스",
        thumb: "https://img.youtube.com/vi/q9bM12ucTIY/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/q9bM12ucTIY?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z5',
        title: "YTN 뉴스",
        thumb: "https://img.youtube.com/vi/FJfwehhzIhw/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/FJfwehhzIhw?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z6',
        title: "매일경제뉴스",
        thumb: "https://img.youtube.com/vi/s9xL1DpBsfQ/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/s9xL1DpBsfQ?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z7',
        title: "MTN 머니투데이",
        thumb: "https://img.youtube.com/vi/lb1oB2feqkQ/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        state: 'mylive',
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/lb1oB2feqkQ?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z8',
        title: "SBS 뉴스",
        thumb: "https://img.youtube.com/vi/hw3iqcXh_qQ/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/hw3iqcXh_qQ?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z9',
        title: "한국경제",
        thumb: "https://img.youtube.com/vi/NJUjU9ALj4A/hqdefault.jpg",
        isFree: true,
        category: "뉴스",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/NJUjU9ALj4A?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z10',
        title: "역사저널 그날",
        thumb: "https://img.youtube.com/vi/4Q-yFBS769A/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/4Q-yFBS769A?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z11',
        title: "벌거벗은 세계사",
        thumb: "https://img.youtube.com/vi/b5UeAVqz4cI/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/b5UeAVqz4cI?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z12',
        title: "1박2일",
        thumb: "https://img.youtube.com/vi/P8QordVAUyU/hqdefault.jpg",
        isFree: true,
        category: "예능",
        state: 'mylive',
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/P8QordVAUyU?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z13',
        title: "비긴어게인",
        thumb: "https://img.youtube.com/vi/8dYNg7bmS5c/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
    <iframe  src="https://www.youtube.com/embed/8dYNg7bmS5c?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z14',
        title: "런닝맨",
        thumb: "https://img.youtube.com/vi/lDcWeklf6DI/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/lDcWeklf6DI?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z15',
        title: "푸른거탑",
        thumb: "https://img.youtube.com/vi/H3uur6g_9CA/hqdefault.jpg",
        isFree: true,
        category: "예능",
        state: 'mylive',
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/H3uur6g_9CA?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z16',
        title: "크라임씬",
        thumb: "https://img.youtube.com/vi/RL2pFHjPaUI/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/RL2pFHjPaUI?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z17',
        title: "연애의 참견",
        thumb: "https://img.youtube.com/vi/4yV2w1b8wxw/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/4yV2w1b8wxw?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z18',
        title: "시간탐험대",
        thumb: "https://img.youtube.com/vi/vuJoalX0ke4/hqdefault.jpg",
        isFree: true,
        category: "예능",
        state: 'mylive',
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/vuJoalX0ke4?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z19',
        title: "무한도전",
        thumb: "https://img.youtube.com/vi/je7aGbAOjiA/hqdefault.jpg",
        isFree: true,
        category: "예능",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/je7aGbAOjiA?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z20',
        title: "태조왕건",
        thumb: "https://img.youtube.com/vi/1bROU5AqM8w/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/1bROU5AqM8w?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z21',
        title: "비밀의 숲",
        thumb: "https://img.youtube.com/vi/5XPwjwz3ZLw/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        state: 'mylive',
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/5XPwjwz3ZLw?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z22',
        title: "감자별",
        thumb: "https://img.youtube.com/vi/-6-OIUhfELQ/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        iframe: `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/-6-OIUhfELQ?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z23',
        title: "호텔 델루나",
        thumb: "https://img.youtube.com/vi/Wsz_If9wZ7g/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/Wsz_If9wZ7g?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z24',
        title: "라이브",
        thumb: "https://img.youtube.com/vi/nzON0i35cso/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        state: 'mylive',
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/nzON0i35cso?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z25',
        title: "여신강림",
        thumb: "https://img.youtube.com/vi/Ci5OGw5HqIw/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/Ci5OGw5HqIw?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z26',
        title: "스물다섯 스물하나",
        thumb: "https://img.youtube.com/vi/QJdCLgv_Zqg/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        state: 'mylive',
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/QJdCLgv_Zqg?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

    {
        id: 'z27',
        title: "이번생은 처음이라",
        thumb: "https://img.youtube.com/vi/9qt9bK9y5aw/hqdefault.jpg",
        isFree: true,
        category: "드라마",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/9qt9bK9y5aw?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

     {
        id: 'z28',
        title: "KBL",
        thumb: "https://img.youtube.com/vi/YPFcgf_8Juo/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/YPFcgf_8Juo?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

       {
        id: 'z29',
        title: "World Skateboard",
        thumb: "https://img.youtube.com/vi/bZHZNsqNLzk/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
     <iframe width="560" height="315" src="https://www.youtube.com/embed/bZHZNsqNLzk?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

     

       {
        id: 'z31',
        title: "NBA",
        thumb: "https://img.youtube.com/vi/uAOagNRdqe4/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        state: 'mylive',
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/uAOagNRdqe4?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

          {
        id: 'z32',
        title: "KBO",
        thumb: "https://img.youtube.com/vi/JzpF_G_Q6rI/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/JzpF_G_Q6rI?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

              {
        id: 'z33',
        title: "KLPGA",
        thumb: "https://img.youtube.com/vi/W-jHZyUC6NM/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        state: 'mylive',
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/W-jHZyUC6NM?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

             {
        id: 'z34',
        title: "Wimbledon",
        thumb: "https://img.youtube.com/vi/vsbePDEpals/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/vsbePDEpals?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

             {
        id: 'z35',
        title: "FIFA",
        thumb: "https://img.youtube.com/vi/w6DcGN5COf4/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/w6DcGN5COf4?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

             {
        id: 'z36',
        title: "J-League",
        thumb: "https://img.youtube.com/vi/EdVGowo6tl4/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
   <iframe width="560" height="315" src="https://www.youtube.com/embed/EdVGowo6tl4?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

         {
        id: 'z40',
        title: "프로야구",
        thumb: "https://img.youtube.com/vi/yCoWH629hUU/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/yCoWH629hUU?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },

     {
        id: 'z41',
        title: "여자야구 올스타전",
        thumb: "https://img.youtube.com/vi/GYswHsosPh4/hqdefault.jpg",
        isFree: true,
        category: "스포츠",
        iframe: `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/GYswHsosPh4?autoplay=1&mute=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    },







];

