# Dream Creator 🌙✨

A magical dream creation experience designed for young children (3+ years old). This interactive web application allows children to select different elements like animals, locations, and activities to create personalized dream stories with **AI-generated dream images** using DALL-E 3!

## Features

🐾 **Animal Selection**: Choose from adorable animals like puppies, kittens, bunnies, and more!
🌍 **Magical Locations**: Pick from enchanting places like parks, oceans, castles, and rainbow lands
🎉 **Fun Activities**: Select activities like flying, dancing, singing, and playing
🤖 **AI-Generated Dream Images**: Real-time creation of beautiful cartoon images using DALL-E 3 API
✨ **Dream Visualization**: Creates a beautiful animated display of the selected dream elements
📖 **Story Generation**: Generates a personalized dream story based on selections
🎨 **Child-Friendly Design**: Large buttons, bright colors, and fun animations perfect for young children

## How the AI Magic Works

When your child creates a dream, the app:
1. Takes their selections (animals, location, activities)
2. Creates a child-friendly story description
3. Sends this to DALL-E 3 with the prompt: "Create a cartoon representation of the following dream of a 3 year old girl using the following description: [dream description]"
4. Displays the beautiful AI-generated image alongside the story
5. Shows a loading animation while the magic happens!

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with animations and gradients
- **Responsive Design** for all devices

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- An Azure OpenAI account with DALL-E 3 access

### Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd dream-creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your actual Azure OpenAI credentials:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and add your Azure OpenAI endpoint and API key

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Azure OpenAI Setup

To use this app, you'll need:
1. An Azure subscription
2. An Azure OpenAI resource with DALL-E 3 deployed
3. Your endpoint URL and API key

Add these to your `.env` file:
```
VITE_AZURE_OPENAI_ENDPOINT=https://your-resource.cognitiveservices.azure.com
VITE_AZURE_OPENAI_API_KEY=your_api_key_here
```

## How to Use

1. **Choose Animals**: Tap on the animal friends you want in your dream
2. **Pick a Location**: Select where your dream adventure takes place
3. **Select Activities**: Choose what fun things you want to do in your dream
4. **Create Dream**: Tap the "Create My Dream!" button to see your magical dream come to life!
5. **Create More**: Use the "Create Another Dream!" button to make new dreams

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # App-specific styles
├── main.tsx         # Application entry point
└── index.css        # Global styles and animations
```

## Features for Parents

- **Safe Content**: All content is child-appropriate and positive
- **Educational**: Encourages creativity and storytelling
- **Accessible**: Large touch targets perfect for small fingers
- **No Data Collection**: Runs entirely in the browser with no external data

## Development

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`

## Customization

You can easily add more animals, locations, or activities by modifying the arrays in `App.tsx`. Each item needs:
- `id`: Unique identifier
- `name`: Display name
- `emoji`: Fun emoji representation

## Browser Support

Works on all modern browsers and mobile devices. Optimized for touch interactions.

---

Made with 💜 for creating magical dreams and wonderful memories!
