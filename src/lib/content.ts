import type { Language } from './types';

type ContentStructure = {
  hero: {
    title: string;
    subtitle: string;
  };
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
  cta: {
    title: string;
    subtitle: string;
  }
  buttons: {
    startSelling: string;
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
  }
};

export const content: Record<Language, ContentStructure> = {
  en: {
    hero: {
      title: 'From Our Farms to Your Family',
      subtitle: 'Fresh, Local Produce Delivered to Your Doorstep.',
    },
    whatWeDo: {
      title: 'How It Works',
      steps: [
        'Farmers list their fresh produce directly on our platform.',
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
    cta: {
        title: "Ready to Get Started?",
        subtitle: "Join our community of farmers and buyers today. Experience the future of fresh produce."
    },
    buttons: {
      startSelling: 'Start Selling',
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
    }
  },
  hi: {
    hero: {
      title: 'हमारे खेतों से आपके परिवार तक',
      subtitle: 'ताज़ा, स्थानीय उपज आपके द्वार पर।',
    },
    whatWeDo: {
      title: 'यह कैसे काम करता है',
      steps: [
        'किसान सीधे हमारे प्लेटफॉर्म पर अपनी ताज़ा उपज सूचीबद्ध करते हैं।',
        'आप ऑनलाइन सर्वोत्तम स्थानीय उत्पादों को ब्राउज़ करते, चुनते और खरीदते हैं।',
        'हम खेत से आपके घर तक तेज़ और सीधी डिलीवरी सुनिश्चित करते हैं।',
      ],
    },
    whyChooseUs: {
      title: 'ग्रो वेजिंदी क्यों चुनें?',
      points: [
        'सीधे खेत से',
        'कोई बिचौलिया नहीं',
        'उचित मूल्य',
        'स्थानीय किसानों का समर्थन करें',
      ],
    },
    ourVision: {
      title: 'हमारा दृष्टिकोण',
      text: 'हमारा दृष्टिकोण भारत के मेहनती किसानों और उपभोक्ताओं के बीच एक मजबूत पुल बनाना है, जो सभी के लिए एक पारदर्शी, निष्पक्ष और टिकाऊ पारिस्थितिकी तंत्र का निर्माण करता है।',
    },
    cta: {
        title: "शुरू करने के लिए तैयार हैं?",
        subtitle: "आज ही हमारे किसानों और खरीदारों के समुदाय में शामिल हों। ताज़ा उपज के भविष्य का अनुभव करें।"
    },
    buttons: {
      startSelling: 'बिक्री शुरू करें',
      shopNow: 'अभी खरीदें',
      registerFarmer: 'किसान के रूप में पंजीकरण करें',
      browseProducts: 'उत्पाद ब्राउज़ करें',
    },
    footer: {
      tagline: 'ग्रो वेजिंदी: मिलकर विकास का पोषण।',
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
    }
  },
  mr: {
    hero: {
      title: 'आमच्या शेतातून तुमच्या कुटुंबापर्यंत',
      subtitle: 'ताजी, स्थानिक भाजीपाला तुमच्या दारात.',
    },
    whatWeDo: {
      title: 'हे कसे कार्य करते',
      steps: [
        'शेतकरी थेट आमच्या प्लॅटफॉर्मवर त्यांची ताजी उत्पादने सूचीबद्ध करतात.',
        'तुम्ही ऑनलाइन सर्वोत्तम स्थानिक उत्पादने ब्राउझ करता, निवडता आणि खरेदी करता.',
        'आम्ही शेतापासून तुमच्या घरापर्यंत जलद आणि थेट वितरणाची खात्री करतो.',
      ],
    },
    whyChooseUs: {
      title: 'ग्रो वेजिंदी का निवडावे?',
      points: [
        'थेट शेतातून',
        'मध्यस्थ नाही',
        'योग्य किंमत',
        'स्थानिक शेतकऱ्यांना आधार द्या',
      ],
    },
    ourVision: {
      title: 'आमचे ध्येय',
      text: 'भारतातील कष्टकरी शेतकरी आणि ग्राहक यांच्यात एक मजबूत पूल बांधणे, सर्वांसाठी एक पारदर्शक, न्याय्य आणि शाश्वत परिसंस्था तयार करणे हे आमचे ध्येय आहे.',
    },
     cta: {
        title: "सुरुवात करण्यास तयार आहात?",
        subtitle: "आजच आमच्या शेतकरी आणि खरेदीदारांच्या समुदायात सामील व्हा. ताज्या उत्पादनांच्या भविष्याचा अनुभव घ्या."
    },
    buttons: {
      startSelling: 'विक्री सुरू करा',
      shopNow: 'आता खरेदी करा',
      registerFarmer: 'शेतकरी म्हणून नोंदणी करा',
      browseProducts: 'उत्पादने ब्राउझ करा',
    },
    footer: {
      tagline: 'ग्रो वेजिंदी: एकत्र विकासाचे संगोपन.',
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
    }
  },
};
