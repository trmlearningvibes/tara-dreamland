# Dream Creator - Customization Instructions

This guide will help you customize the Dream Creator app for your own child. The app is designed to be easily personalized!

## 🎨 Quick Customizations

### 1. Change the Header Image
- **File to replace**: `public/Taras dreamland.png`
- **Steps**:
  1. Create or find an image for your child (recommended size: 800x200 pixels)
  2. Save it as `[YourChildsName] dreamland.png`
  3. Replace the existing file in the `public` folder
  4. Update the image reference in `src/App.tsx` (line ~207):
     ```tsx
     src="/[YourChildsName]%20dreamland.png"
     ```

### 2. Personalize the AI Prompt
- **File to edit**: `src/App.tsx`
- **What to change**: Update the description of your child (around line 102)
- **Current prompt**:
  ```
  Create a Ghibli style dream representation of a 3 year old indian girl with curly black hair in pigtails wearing a very simple [COLOR] dress...
  ```
- **Change to match your child**:
  ```
  Create a Ghibli style dream representation of a [age] year old [ethnicity] [boy/girl] with [hair description] wearing a very simple [COLOR] [clothing item]...
  ```

### 3. Update Selection Options

#### Add/Remove Animals
- **File**: `src/App.tsx` (lines 17-27)
- **Format**: `{ id: 'animal-name', name: 'Display Name', emoji: '🐶' }`
- **Example**: Add a horse: `{ id: 'horse', name: 'Horse', emoji: '🐴' }`

#### Add/Remove Locations  
- **File**: `src/App.tsx` (lines 29-39)
- **Example**: Add "School": `{ id: 'school', name: 'School', emoji: '🏫' }`

#### Add/Remove Activities
- **File**: `src/App.tsx` (lines 41-51)
- **Example**: Add "Drawing": `{ id: 'drawing', name: 'Drawing', emoji: '🎨' }`

#### Add/Remove Dress Colors
- **File**: `src/App.tsx` (lines 53-60)
- **Example**: Add "Silver": `{ id: 'silver', name: 'Silver', emoji: '🤍' }`

### 4. Change Section Titles
- **File**: `src/App.tsx`
- **Lines to edit**:
  - Line ~216: `<h2>Choose a dress color:</h2>`
  - Line ~233: `<h2>Choose your animal friends:</h2>`
  - Line ~250: `<h2>Choose your magical place:</h2>`
  - Line ~267: `<h2>Choose what you want to do:</h2>`

## 🔧 Advanced Customizations

### Update API Settings
- **File**: `src/App.tsx` (lines 110-120)
- **What to change**: Replace with your own Azure OpenAI endpoint and API key
- **⚠️ Important**: Keep your API key secure!

### Modify App Title and Subtitle
- **File**: `src/App.tsx`
- **Title image**: Line ~207
- **Subtitle**: Line ~212: `<p className="subtitle">Create your magical dream adventure!</p>`

### Change Color Scheme
- **File**: `src/App.css`
- **What to customize**: Colors, fonts, button styles, backgrounds

## 📝 Testing Your Changes

1. Save all your files
2. Run the app: `npm run dev`
3. Open `http://localhost:3000` in your browser
4. Test creating a dream to make sure everything works

## 🎯 Quick Start Checklist

- [ ] Replace header image with your child's name
- [ ] Update the AI prompt to describe your child
- [ ] Add 2-3 of your child's favorite animals
- [ ] Add 1-2 locations your child loves
- [ ] Add 1-2 activities your child enjoys
- [ ] Test the app and create a sample dream

## 💡 Tips

- **Emoji finder**: Use [emojipedia.com](https://emojipedia.com) to find perfect emojis
- **Image editing**: Use free tools like GIMP or Canva for the header image
- **Backup**: Always keep a copy of your original files before making changes
- **Small changes**: Make one change at a time and test to avoid errors

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for error messages (F12 key)
2. Make sure all quotes and brackets are properly closed
3. Restart the development server (`npm run dev`)
4. Double-check file paths and names

Enjoy creating magical dreams with your child! ✨
