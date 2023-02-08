const gameNames = [
  "obstacleSpeedRacer",
  "droneFlying",
  "spotSoldier",
  "sar21Shooting",
  "obstacleCourse",
];

const gameFileNames = [
  "build.json",
  "Build.wasm.code.unityweb",
  "Build.wasm.framework.unityweb",
  "Build.data.unityweb",
];

const gamesConnectSrcCsp = gameNames
  .map((gameName) => {
    const urls = gameFileNames
      .map((gameFileName) => {
        return `https://aoh-2022-games.netlify.app/${gameName}/${gameFileName}`;
      })
      .join(" ");

    return urls;
  })
  .join(" ");

const cloudFunctionsCsp = () => {
  const endpoints = [
    "submitScoreLeaderBoard",
    "submitScoreLeaderBoardNew",
    "getLeaderboard",
    "bookOnlineTicket",
    "createUser",
    "sendEmailOtp",
    "submitNsStory",
  ];

  return endpoints
    .map((endpoint) => {
      let rule = `https://us-central1-army-open-house-2022.cloudfunctions.net/${endpoint}`;

      if (process.env.NODE_ENV === "development") {
        return `${rule} http://localhost:5001/army-open-house-2022/us-central1/${endpoint}`;
      } else {
        rule = `https://us-central1-army-open-house-2022-prod.cloudfunctions.net/${endpoint}`;
      }

      return rule;
    })
    .join(" ");
};

/* const ContentSecurityPolicy = `
  default-src 'self' https://www.google-analytics.com 'unsafe-inline';
  script-src 'self' 'unsafe-eval' blob: securetoken.googleapis.com https://www.google-analytics.com https://apis.google.com/js/api.js https://www.google.com/recaptcha/api.js https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en.js https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.iTmf4rxOyWc.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo-LTnDn-AS2QlMWYZdnaV1OuFR7Iw/cb=gapi.loaded_0;
  object-src 'self';
  script-src-elem 'self' blob: https://www.googletagmanager.com/gtag/js 'sha256-9mR10A/fCdqFIycFlnsIg931g2AJek2nq65nxlwud8I=' https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com/recaptcha/api.js https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en.js https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en_gb.js https://apis.google.com/js/api.js https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.iTmf4rxOyWc.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo-LTnDn-AS2QlMWYZdnaV1OuFR7Iw/cb=gapi.loaded_0;
  child-src 'self' blob: firebasestorage.googleapis.com;
  style-src 'self' 'unsafe-inline' firebasestorage.googleapis.com cdnjs.cloudflare.com;
  font-src 'self' cdnjs.cloudflare.com;  
  img-src 'self' 'unsafe-inline' firebasestorage.googleapis.com https://www.google-analytics.com www.google-analytics.com data:;
  media-src 'self' 'unsafe-inline' firebasestorage.googleapis.com;
  connect-src 'self' 'unsafe-inline' firestore.googleapis.com https://www.google-analytics.com https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword https://identitytoolkit.googleapis.com/v1/accounts:lookup https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode https://securetoken.googleapis.com/v1/token ${gamesConnectSrcCsp} ${cloudFunctionsCsp()};
  worker-src 'self' blob:;
  frame-src 'self' https://www.google.com https://army-open-house-2022.firebaseapp.com;
`; */

const ContentSecurityPolicy = {
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "frame-ancestors": ["'self'"],
  "report-uri": ["/api/csp-reports"],
  "manifest-src": ["'self'"],
  "prefetch-src": ["'self'"],
  "default-src": [
    "'self'",
    // "'unsafe-inline'",
    // "https://www.google-analytics.com",
  ],
  "object-src": ["'none'"],
  "script-src": [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "'report-sample'",
    "blob:",
    "https://www.googletagmanager.com/gtag/js",
    "https://securetoken.googleapis.com",
    "https://www.google-analytics.com",
    "https://apis.google.com/js/api.js",
    "https://www.google.com/recaptcha/api.js",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en.js",
    "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.iTmf4rxOyWc.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo-LTnDn-AS2QlMWYZdnaV1OuFR7Iw/cb=gapi.loaded_0",
    "https://plugins.flockler.com/embed/",
    "https://fl-1.cdn.flockler.com/embed/embed-v2.js",
    "https://fl-1.cdn.flockler.com/assets/embed/wall_v2/assets/javascripts/",
  ],
  "script-src-elem": [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    "blob:",
    "https://www.googletagmanager.com/gtag/js",
    // "'sha256-9mR10A/fCdqFIycFlnsIg931g2AJek2nq65nxlwud8I='",
    "https://www.google-analytics.com",
    "https://ssl.google-analytics.com",
    "https://www.google.com/recaptcha/api.js",
    "https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en.js",
    "https://www.gstatic.com/recaptcha/releases/nEGwmCAyCoKVn9PSwAGnQWhY/recaptcha__en_gb.js",
    "https://apis.google.com/js/api.js",
    "https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.iTmf4rxOyWc.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo-LTnDn-AS2QlMWYZdnaV1OuFR7Iw/cb=gapi.loaded_0",
    "https://www.gstatic.com/recaptcha/releases/0aeEuuJmrVqDrEL39Fsg5-UJ/recaptcha__en.js",
    "https://plugins.flockler.com/embed/",
    "https://fl-1.cdn.flockler.com/embed/embed-v2.js",
    "https://fl-1.cdn.flockler.com/assets/embed/wall_v2/assets/javascripts/",
  ],
  "child-src": ["'self'", "blob:", "https://firebasestorage.googleapis.com"],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "'report-sample'",
    "https://firebasestorage.googleapis.com",
    "https://cdnjs.cloudflare.com",
    "https://fl-1.cdn.flockler.com/assets/embed/wall_v2/assets/stylesheets/application-fedd8ed5861c3e74ad2f7c143ebbb20605fd434ae65f88645171678f5a9d27f9.css",
  ],
  "font-src": ["'self'", "data:", "https://cdnjs.cloudflare.com"],
  "img-src": [
    "'self'",
    // "'unsafe-inline'",
    "data:",
    "https://firebasestorage.googleapis.com",
    "https://www.google-analytics.com",
    "https://www.google-analytics.com",
    "https://fl-1.cdn.flockler.com/embed/loading.gif",
    "https://media-api.flockler.com/instagram/image/",
    "https://media-api.flockler.com/instagram/video_cover/",
    "https://scontent.cdninstagram.com/v/",
  ],
  "media-src": [
    "'self'",
    // "'unsafe-inline'",
    "https://firebasestorage.googleapis.com",
  ],
  "connect-src": [
    "'self'",
    // "'unsafe-inline'",
    "https://firestore.googleapis.com",
    "https://www.google-analytics.com",
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup",
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode",
    "https://securetoken.googleapis.com/v1/token",
    "https://plugins.flockler.com/embed/v1/20484",
    "https://sockjs-ap1.pusher.com/pusher/app/",
    "wss://ws-ap1.pusher.com/app/",
    gamesConnectSrcCsp,
    cloudFunctionsCsp(),
    process.env.NODE_ENV === "development"
      ? "ws://localhost:3000/_next/webpack-hmr"
      : "",
  ],
  "worker-src": ["'self'", "blob:"],
  "frame-src": [
    "'self'",
    "https://www.google.com",
    `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}`,
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
  ],
};

if (process.env.NODE_ENV === "production") {
  ContentSecurityPolicy["upgrade-insecure-requests"] = [];
}

const securityHeaders = [
  /* {
    key: "Content-Security-Policy",
    // value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    value: Object.entries(ContentSecurityPolicy)
      .map(([key, value]) => {
        return `${key} ${value.join(" ")};`;
      })
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim(),
  }, */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];
module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  generateEtags: false,
};
