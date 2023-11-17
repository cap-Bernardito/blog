import type { Meta, StoryObj } from "@storybook/react";

import { Code } from "./code";

const meta = {
  title: "shared/Code",
  component: Code,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    language: "python",
    children:
      'class Animal:\n\tdef __init__(self, name):\n\t\tself.name = name\n\n\tdef speak(self):\n\t\tpass\n\nclass Dog(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Гав!"\n\nclass Cat(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Мяу!"\n\n# Создаем объекты\ndog = Dog("Барсик")\ncat = Cat("Мурзик")\n\n# Вызываем метод speak() для объектов разных классов\nprint(dog.speak()) # Вывод: "Барсик говорит: Гав!"\nprint(cat.speak()) # Вывод: "Мурзик говорит: Мяу!"\n',
  },
};

export const Dark: Story = {
  args: {
    language: "python",
    children:
      'class Animal:\n\tdef __init__(self, name):\n\t\tself.name = name\n\n\tdef speak(self):\n\t\tpass\n\nclass Dog(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Гав!"\n\nclass Cat(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Мяу!"\n\n# Создаем объекты\ndog = Dog("Барсик")\ncat = Cat("Мурзик")\n\n# Вызываем метод speak() для объектов разных классов\nprint(dog.speak()) # Вывод: "Барсик говорит: Гав!"\nprint(cat.speak()) # Вывод: "Мурзик говорит: Мяу!"\n',
  },
  parameters: { theme: "dark" },
};

export const Orange: Story = {
  args: {
    language: "python",
    children:
      'class Animal:\n\tdef __init__(self, name):\n\t\tself.name = name\n\n\tdef speak(self):\n\t\tpass\n\nclass Dog(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Гав!"\n\nclass Cat(Animal):\n\tdef speak(self):\n\t\treturn f"{self.name} говорит: Мяу!"\n\n# Создаем объекты\ndog = Dog("Барсик")\ncat = Cat("Мурзик")\n\n# Вызываем метод speak() для объектов разных классов\nprint(dog.speak()) # Вывод: "Барсик говорит: Гав!"\nprint(cat.speak()) # Вывод: "Мурзик говорит: Мяу!"\n',
  },
  parameters: { theme: "orange" },
};
