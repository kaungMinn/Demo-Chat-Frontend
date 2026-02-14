import type { Meta, StoryObj } from "@storybook/react-vite"; // Use '@storybook/react' if not using vite

import {
  Select,
  SelectContent,
  SelectGroup, // Optional: for grouping items
  SelectItem,
  SelectLabel, // Optional: for group labels
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust path as needed

// --- 1. Meta: Configuration for Storybook ---

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  // Add controls/argTypes here if you want to control props of the main component
  parameters: {
    // Optional: configure layout for visual alignment
    layout: "centered",
  },
};

export default meta;

// Defines the type for individual stories
type Story = StoryObj<typeof Select>;

// --- 2. Stories: Defines component states ---

/**
 * A basic Select component with a few options.
 * Note: The `Select` component itself doesn't render much;
 * its functionality is driven by the subcomponents.
 * The Story needs a `render` function to build the complete component.
 */
export const Default: Story = {
  // Use the render function to construct the full component
  // with all necessary subcomponents for a working example.
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        {/* SelectValue displays the currently selected option */}
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      {/* SelectContent holds the dropdown list */}
      <SelectContent>
        {/* SelectGroup and SelectLabel are optional for better organization */}
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {/* SelectItem are the individual options */}
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// --- Example with Grouping ---

/** A Select component demonstrating item grouping. */
export const Grouped: Story = {
  render: () => (
    <Select defaultValue="react">
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="django">Django</SelectItem>
          <SelectItem value="rails">Ruby on Rails</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
