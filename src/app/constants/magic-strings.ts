import { BarChart3, CheckCircle, TrendingUp } from "lucide-react";

export const LANDING_PAGE = {
  HERO: {
    MAIN_TEXT_ONE: "Track your Job Hunt",
    MAIN_TEXT_TWO: "Like Never Before",
    DESCRIPTION:
      "Say goodbye to messy Excel sheets. Track applications, manage interviews, and land your dream job with our powerful, intuitive platform.",
    CTA_BUTTON: "Start Tracking Free",
  },
  FEATURES: [
    {
      icon: CheckCircle,
      title: "Track Applications",
      description:
        "Organize every application with status updates, notes, and deadlines in one place.",
      delay: 0.9,
    },
    {
      icon: TrendingUp,
      title: "Monitor Progress",
      description:
        "Visualize your job search journey with insights and analytics on your applications.",
      delay: 1,
    },
    {
      icon: BarChart3,
      title: "Get Insights",
      description:
        "Make data-driven decisions with powerful analytics on response rates and trends.",
      delay: 1.1,
    },
  ],
};

export const HEADER = {
  APP_NAME: "Huntify",
  SIGN_IN_BUTTON: "Sign in",
  SIGN_UP_BUTTON: "Get Started",
};
