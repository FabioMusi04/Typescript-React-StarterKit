export const steps = [
  {
    title: "Step 1: SMTP Configuration",
    description: "Please provide your SMTP server details to enable sending emails through the system. This is important for system notifications and user email communication.",
    fields: [
      { label: "SMTP Server", placeholder: "Enter SMTP server", type: "text", required: true },
      { label: "Port", placeholder: "Enter port", type: "text", required: true  }
    ]
  },
  {
    title: "Step 2: Support Email Configuration",
    description: "Configure your support email address. This is the address users will contact for any support issues or inquiries.",
    fields: [
      { label: "Support Email", placeholder: "Enter support email", type: "email", required: true  }
    ]
  },
  {
    title: "Step 3: Email Configuration to send notifications",
    description: "Configure the email address that will be used to send notifications to users.",
    fields: [
      { label: "Email Address", placeholder: "Enter email address", type: "email", required: true  },
      { label: "Password", placeholder: "Enter password", type: "password", required: true  }
    ]
  },
];
