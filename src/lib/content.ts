
import type { Language } from './types';

type ContentStructure = {
  hero: {
    title: string;
    subtitle: string;
  };
  features: {
    title: string;
    description: string;
  }[];
  whatWeDo: {
    title: string;
    steps: string[];
  };
  whyChooseUs: {
    title: string;
    points: string[];
  };
  ourVision: {
    title: string;
    text: string;
  };
  notify: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    mobilePlaceholder: string;
    buttonText: string;
    submittingText: string;
    successTitle: string;
    successSubtitle: string;
    nameError: string;
    emailError: string;
    mobileError: string;
  },
  cta: {
    title: string;
    subtitle: string;
  }
  buttons: {
    shopNow: string;
    registerFarmer: string;
    browseProducts: string;
  };
  footer: {
    tagline: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    welcome: string;
  }
  cart: {
    title: string;
    empty: string;
    product: string;
    price: string;
    quantity: string;
    total: string;
    checkout: string;
  },
  signIn: {
    title: string;
    description: string;
    emailLabel: string;
    passwordLabel: string;
    button: string;
    noAccount: string;
  },
  signUp: {
    title: string;
    description: string;
    farmerTitle: string;
    farmerDescription: string;
    nameLabel: string;
    farmerNameLabel: string;
    mobileLabel: string;
    villageLabel: string;
    talukaLabel: string;
    districtLabel: string;
    passwordLabel: string;
    createAccountButton: string;
    alreadyHaveAccount: string;
  }
};

export const content: Record<Language, ContentStructure> = {
  en: {
    hero: {
      title: 'It is now our responsibility to deliver pure and fresh vegetables, fruits and vegetables directly to the "customer" from the "farmer king" farmland',
      subtitle: 'Join Grow Vejindi and connect directly with local customers. Skip the middlemen, set your own prices, and grow your farm income.',
    },
    features: [
      { title: "Sell Directly to Buyers", description: "Cut out the middleman and connect with customers in your area who are looking for fresh, local Product." },
      { title: "Set Your Own Prices", description: "You have the freedom to set fair prices for your products, ensuring you get the compensation you deserve." },
      { title: "Grow Your Farm Income", description: "By reaching a wider customer base and controlling your prices, you can significantly increase your earnings." }
    ],
    whatWeDo: {
      title: 'How It Works',
      steps: [
        'Farmers list their fresh Product directly on our platform.',
        'You browse, select, and purchase the best local products online.',
        'We ensure fast and direct delivery from the farm to your home.',
      ],
    },
    whyChooseUs: {
      title: 'Why Choose Grow Vejindi?',
      points: [
        'Direct from Farm',
        'No Middlemen',
        'Fair Prices',
        'Support Local Farmers',
      ],
    },
    ourVision: {
      title: 'Our Vision',
      text: "Our vision is to build a strong bridge between India's hardworking farmers and consumers, creating a transparent, fair, and sustainable ecosystem for all.",
    },
    notify: {
        title: "We’re Launching Soon!",
        subtitle: "Be the first to know when we go live. Join our waitlist for exclusive updates.",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email Address",
        mobilePlaceholder: "Your Mobile Number",
        buttonText: "Notify Me",
        submittingText: "Submitting...",
        successTitle: "Thank you for your interest!",
        successSubtitle: "You're on the list. We'll notify you at launch.",
        nameError: "Name must be at least 2 characters",
        emailError: "Please enter a valid email address",
        mobileError: "Please enter a valid 10-digit mobile number",
    },
    cta: {
        title: "Ready to Get Started?",
        subtitle: "Join our community of farmers and buyers today. Experience the future of fresh Product."
    },
    buttons: {
      shopNow: 'Shop Now',
      registerFarmer: 'Register as Farmer',
      browseProducts: 'Browse Products',
    },
    footer: {
      tagline: 'Grow Vejindi: Nurturing Growth, Together.',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      welcome: 'Welcome',
    },
    cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty.',
        product: 'Product',
        price: 'Price',
        quantity: 'Quantity',
        total: 'Total',
        checkout: 'Proceed to Checkout',
    },
    signIn: {
      title: 'Sign In',
      description: 'Enter your email below to login to your account.',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      button: 'Sign In',
      noAccount: "Don't have an account?",
    },
    signUp: {
        title: 'Create an Account',
        description: 'Fill in your details to get started.',
        farmerTitle: 'Farmer Sign Up',
        farmerDescription: 'Create an account to start selling your Product.',
        nameLabel: 'Full Name',
        farmerNameLabel: 'Farm Name / Your Name',
        mobileLabel: 'Mobile Number',
        villageLabel: 'Village',
        talukaLabel: 'Taluka',
        districtLabel: 'District',
        passwordLabel: 'Password',
        createAccountButton: 'Create Account',
        alreadyHaveAccount: 'Already have an account?',
    }
  },
  hi: {
    hero: {
      title: 'अब हमारी जिम्मेदारी है कि हम "किसान राजा" के बांध से शुद्ध और ताजा सब्जियां, फल और सब्जियाँ सीधे "ग्राहक" तक पहुंचाएं...',
      subtitle: 'स्थानीय खरीदारों से सीधे जुड़ें और अपनी आय बढ़ाएं।',
    },
    features: [
        { title: "सीधे खरीदारों को बेचें", description: "बिचौलिए को हटा दें और अपने क्षेत्र में उन ग्राहकों से जुड़ें जो ताजा, स्थानीय उत्पाद की तलाश में हैं।" },
        { title: "अपनी कीमतें खुद निर्धारित करें", description: "आपको अपने उत्पादों के लिए उचित मूल्य निर्धारित करने की स्वतंत्रता है, यह सुनिश्चित करते हुए कि आपको वह मुआवजा मिले जिसके आप हकदार हैं।" },
        { title: "अपनी कृषि आय बढ़ाएँ", description: "एक विस्तृत ग्राहक आधार तक पहुँचकर और अपनी कीमतों को नियंत्रित करके, आप अपनी कमाई में उल्लेखनीय वृद्धि कर सकते हैं।" }
    ],
    whatWeDo: {
      title: 'यह कैसे काम करता है',
      steps: [
        'किसान सीधे हमारे प्लेटफॉर्म पर अपनी ताज़ा उत्पाद सूचीबद्ध करते हैं।',
        'आप ऑनलाइन सर्वोत्तम स्थानीय उत्पादों को ब्राउज़ करते, चुनते और खरीदते हैं।',
        'हम खेत से आपके घर तक तेज़ और सीधी डिलीवरी सुनिश्चित करते हैं।',
      ],
    },
    whyChooseUs: {
      title: 'ग्रो वेजइंडी क्यों चुनें?',
      points: [
        'सीधे खेत से',
        'कोई बिचौलिया नहीं',
        'उचित मूल्य',
        'स्थानीय किसानों का समर्थन',
      ],
    },
    ourVision: {
      title: 'हमारा दृष्टिकोण',
      text: 'हमारा दृष्टिकोण भारत के मेहनती किसानों और उपभोक्ताओं के बीच एक मजबूत पुल बनाना है, जो सभी के लिए एक पारदर्शी, निष्पक्ष और टिकाऊ पारिस्थितिकी तंत्र का निर्माण करता है।',
    },
    notify: {
        title: "हम जल्द ही लॉन्च कर रहे हैं!",
        subtitle: "हम जल्द ही आ रहे हैं! सबसे पहले जानने के लिए हमारी प्रतीक्षा सूची में शामिल हों।",
        namePlaceholder: "आपका नाम",
        emailPlaceholder: "आपका ईमेल पता",
        mobilePlaceholder: "आपका मोबाइल नंबर",
        buttonText: "मुझे सूचित करें",
        submittingText: "सबमिट हो रहा है...",
        successTitle: "आपकी रुचि के लिए धन्यवाद!",
        successSubtitle: "आप सूची में हैं। हम आपको लॉन्च के समय सूचित करेंगे।",
        nameError: "नाम कम से कम 2 अक्षर का होना चाहिए",
        emailError: "कृपया एक वैध ईमेल पता दर्ज करें",
        mobileError: "कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें",
    },
    cta: {
        title: "शुरू करने के लिए तैयार हैं?",
        subtitle: "आज ही हमारे किसानों और खरीदारों के समुदाय में शामिल हों। ताज़ा उत्पाद के भविष्य का अनुभव करें।"
    },
    buttons: {
      shopNow: 'अभी खरीदें',
      registerFarmer: 'किसान के रूप में पंजीकरण करें',
      browseProducts: 'उत्पाद ब्राउज़ करें',
    },
    footer: {
      tagline: 'ग्रो वेजइंडी: मिलकर विकास का पोषण।',
    },
     auth: {
      signIn: 'साइन इन करें',
      signUp: 'साइन अप करें',
      signOut: 'साइन आउट करें',
      welcome: 'स्वागत है',
    },
    cart: {
        title: 'शॉपिंग कार्ट',
        empty: 'आपकी कार्ट खाली है।',
        product: 'उत्पाद',
        price: 'कीमत',
        quantity: 'मात्रा',
        total: 'कुल',
        checkout: 'चेकआउट के लिए आगे बढ़ें',
    },
    signIn: {
      title: 'साइन इन करें',
      description: 'अपने खाते में लॉगिन करने के لیے नीचे अपना ईमेल दर्ज करें।',
      emailLabel: 'ईमेल',
      passwordLabel: 'पासवर्ड',
      button: 'साइन इन करें',
      noAccount: 'खाता नहीं है?',
    },
    signUp: {
        title: 'खाता बनाएं',
        description: 'आरंभ करने के लिए अपना विवरण भरें।',
        farmerTitle: 'किसान साइन अप',
        farmerDescription: 'अपनी उत्पाद बेचना शुरू करने के लिए एक खाता बनाएं।',
        nameLabel: 'पूरा नाम',
        farmerNameLabel: 'खेत का नाम / आपका नाम',
        mobileLabel: 'मोबाइल नंबर',
        villageLabel: 'गाँव',
        talukaLabel: 'तालुका',
        districtLabel: 'जिला',
        passwordLabel: 'पासवर्ड',
        createAccountButton: 'खाता बनाएं',
        alreadyHaveAccount: 'पहले से ही एक खाता है?',
    }
  },
  mr: {
    hero: {
      title: '"शेतकरीराजाच्या" बांधावरून शुद्ध व ताजा भाजीपाला, फळभाज्या व फळे थेट "ग्राहकांपर्यंत" पोहचवण्याची जबाबदारी आत्ता आमची...',
      subtitle: 'ग्रो वेजइंडीमध्ये सामील व्हा! आणि थेट आमच्याशी संपर्क साधा.आपल्या शेतीतून मिळणारे उत्पादनांचे दर आमच्यासोबत निश्चित करा व आपले उत्पन्न वाढवा.',
    },
    features: [
        { title: "थेट ग्रो वेजइंडीला विक्री करा", description: "दलालांना वगळा आणि थेट ग्रो वेजइंडीला विक्री करा. ग्रो वेजइंडी आपल्या ताज्या उत्पादनांचे ग्राहकांपर्यंत वितरण करते." },
        { title: "आपल्या उत्पादनांच्या किंमती ठरवा", description: "तुम्हाला तुमच्या उत्पादनांसाठी योग्य किंमती ठरवण्याचे स्वातंत्र्य आहे, ज्यामुळे तुम्हाला योग्य मोबदला मिळेल याची खात्री होते." },
        { title: "तुमचे शेती उत्पन्न वाढवा", description: "विस्तृत ग्राहक वर्गापर्यंत पोहोचून आणि तुमच्या किंमतींवर नियंत्रण ठेवून, तुम्ही तुमच्या कमाईत लक्षणीय वाढ करू शकता." }
    ],
    whatWeDo: {
      title: 'ग्रो वेजइंडी कसे कार्य करते ?',
      steps: [
        'शेतकरी थेट आमच्या प्लॅटफॉर्मवर त्यांची ताजी उत्पादने सुचीबद्ध करतात.',
        'ग्राहक ऑनलाइन सर्वोत्तम उत्पादने शोधुन खरेदी करू शकतो.',
        'आम्ही शेतापासून तुमच्या घरापर्यंत जलद आणि थेट वितरणाची खात्री करतो.',
      ],
    },
    whyChooseUs: {
      title: 'ग्रो वेजइंडी का निवडावे ?',
      points: [
        'थेट शेतातून',
        'मध्यस्थ नाही',
        'योग्य किंमत',
        'शेतकऱ्यांना आधार',
      ],
    },
    ourVision: {
      title: 'आमचे ध्येय',
      text: 'भारतातील कष्टकरी शेतकरी आणि ग्राहक यांच्यात एक मजबूत नातं जोडणं, सर्वांसाठी पारदर्शक आणि शाश्वत परिसंस्था निर्माण करणे हे आमचे ध्येय आहे',
    },
    notify: {
        title: "आम्ही लवकरच लॉन्च करत आहोत!",
        subtitle: "आम्ही लवकरच येत आहोत! सर्वात आधी जाणून घेण्यासाठी आमच्या वेटलिस्टमध्ये नाव नोंदवा.",
        namePlaceholder: "तुमचे नाव",
        emailPlaceholder: "तुमचा ईमेल पत्ता",
        mobilePlaceholder: "तुमचा मोबाईल नंबर",
        buttonText: "मला सूचित करा",
        submittingText: "सबमिट करत आहे...",
        successTitle: "तुमच्या आवडीबद्दल धन्यवाद!",
        successSubtitle: "तुम्ही यादीत आहात. आम्ही तुम्हाला लॉन्चच्या वेळी सूचित करू.",
        nameError: "नाव किमान २ अक्षरे असावे",
        emailError: "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
        mobileError: "कृपया वैध १०-अंकी मोबाईल नंबर टाका",
    },
     cta: {
        title: "सुरुवात करण्यास तयार आहात?",
        subtitle: "आजच आमच्या शेतकरी आणि खरेदीदारांच्या समुदायात सामील व्हा. ताज्या उत्पादनांच्या भविष्याचा अनुभव घ्या."
    },
    buttons: {
      shopNow: 'आता खरेदी करा',
      registerFarmer: 'शेतकरी म्हणून नोंदणी करा',
      browseProducts: 'उत्पादने ब्राउझ करा',
    },
    footer: {
      tagline: 'ग्रो वेजइंडी: एकत्र विकासाचे संगोपन.',
    },
    auth: {
      signIn: 'साइन इन करा',
      signUp: 'साइन अप करा',
      signOut: 'साइन आउट करा',
      welcome: 'स्वागत आहे',
    },
    cart: {
        title: 'शॉपिंग कार्ट',
        empty: 'तुमची कार्ट रिकामी आहे.',
        product: 'उत्पादन',
        price: 'किंमत',
        quantity: 'प्रमाण',
        total: 'एकूण',
        checkout: 'चेकआउट करण्यासाठी पुढे जा',
    },
    signIn: {
      title: 'साइन इन करा',
      description: 'तुमच्या खात्यात लॉग इन करण्यासाठी खाली तुमचा ईमेल प्रविष्ट करा.',
      emailLabel: 'ईमेल',
      passwordLabel: 'पासवर्ड',
      button: 'साइन इन करा',
      noAccount: 'खाते नाही?',
    },
    signUp: {
        title: 'खाते तयार करा',
        description: 'सुरुवात करण्यासाठी तुमचे तपशील भरा.',
        farmerTitle: 'शेतकरी साइन अप',
        farmerDescription: 'तुमची उत्पादने विकायला सुरुवात करण्यासाठी खाते तयार करा.',
        nameLabel: 'पूर्ण नाव',
        farmerNameLabel: 'शेताचे नाव / तुमचे नाव',
        mobileLabel: 'मोबाईल नंबर',
        villageLabel: 'गाव',
        talukaLabel: 'तालुका',
        districtLabel: 'जिल्हा',
        passwordLabel: 'पासवर्ड',
        createAccountButton: 'खाते तयार करा',
        alreadyHaveAccount: 'आधीपासूनच खाते आहे?',
    }
  },
};
