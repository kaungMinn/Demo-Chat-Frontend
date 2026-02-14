import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../components/ui/button";

// --- 1. Metadata: Defines Component, Title, and Docs ---
const meta: Meta<typeof Button> = {
  // Title for the component in the Storybook sidebar
  title: "UI/Button",

  // The component itself
  component: Button,

  // Automatically generates documentation pages
  tags: ["autodocs"],

  // Maps props to Storybook controls for easy testing
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      description: "The visual style of the button (default to primary look).",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the button is disabled.",
    },
    // Allows editing the text content directly in the Controls panel
    children: {
      control: "text",
    },
  },

  // Default props applied to all stories unless overridden
  args: {
    children: "Click Me",
    variant: "default",
    size: "default",
  },
};

export default meta;

// Defines the type for individual stories
type Story = StoryObj<typeof Button>;

// --- 2. Stories: Defines component states ---

/** The default primary button style. */
export const Default: Story = {};

/** A button using the secondary variant. */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Action",
  },
};

/** A button style typically used for confirming irreversible actions. */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete Item",
  },
};

/** A button with a smaller size and the outline style. */
export const SmallOutline: Story = {
  args: {
    variant: "outline",
    size: "sm",
    children: "Small Outline",
  },
};

/** A button that is disabled and cannot be interacted with. */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
