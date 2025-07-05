import { useState } from 'react'
import './App.css'

interface SelectionItem {
  id: string
  name: string
  emoji: string
}

interface GeneratedImage {
  url: string
  loading: boolean
  error?: string
}

const animals: SelectionItem[] = [
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'dog', name: 'Dog', emoji: '🐕' },
  { id: 'cow', name: 'Cow', emoji: '🐮' },
  { id: 'bird', name: 'Bird', emoji: '🐦' },
  { id: 'mouse', name: 'Mouse', emoji: '🐁' },
  { id: 'tiger', name: 'Tiger', emoji: '🐅' },
  { id: 'panda', name: 'Panda', emoji: '🐼' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰' },
]

const locations: SelectionItem[] = [
  { id: 'park', name: 'Park', emoji: '🌳' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊' },
  { id: 'forest', name: 'Forest', emoji: '🌲' },
  { id: 'garden', name: 'Garden', emoji: '🌺' },
  { id: 'castle', name: 'Castle', emoji: '🏰' },
  { id: 'beach', name: 'Beach', emoji: '🏖️' },
  { id: 'rainbow', name: 'Rainbow Land', emoji: '🌈' },
  { id: 'clouds', name: 'Cloud City', emoji: '☁️' },
  { id: 'home', name: 'Home', emoji: '🏠' },
]

const activities: SelectionItem[] = [
  { id: 'dancing', name: 'Dancing', emoji: '💃' },
  { id: 'singing', name: 'Singing', emoji: '🎵' },
  { id: 'laughing', name: 'Laughing', emoji: '😂' },
  { id: 'eating-icecream', name: 'Eating Ice Cream', emoji: '🍦' },
  { id: 'swimming', name: 'Swimming', emoji: '🏊' },
  { id: 'sleeping', name: 'Sleeping', emoji: '😴' },
  { id: 'playing-ball', name: 'Playing with a Ball', emoji: '⚽' },
  { id: 'cooking', name: 'Cooking', emoji: '🍳' },
  { id: 'reading', name: 'Reading', emoji: '📖' },
]

const dressColors: SelectionItem[] = [
  { id: 'purple', name: 'Purple', emoji: '💜' },
  { id: 'pink', name: 'Pink', emoji: '💗' },
  { id: 'blue', name: 'Blue', emoji: '💙' },
  { id: 'yellow', name: 'Yellow', emoji: '💛' },
  { id: 'red', name: 'Red', emoji: '❤️' },
  { id: 'green', name: 'Green', emoji: '💚' },
]

function App() {
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [selectedDressColor, setSelectedDressColor] = useState<string>('')
  const [dreamCreated, setDreamCreated] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage>({
    url: '',
    loading: false
  })
  const [debugMode, setDebugMode] = useState(false)
  const [debugLogs, setDebugLogs] = useState<string[]>([])
  const [customPrompt, setCustomPrompt] = useState('')

  const addDebugLog = (message: string) => {
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
    console.log(message)
  }

  const generateDreamImage = async (_dreamDescription: string) => {
    setGeneratedImage({ url: '', loading: true })
    
    try {
      // === CUSTOMIZABLE PROMPT SECTION ===
      // Get selected items for prompt parameters
      const selectedAnimalItems = getSelectedItems(animals, selectedAnimals)
      const selectedLocationItem = getSelectedItem(locations, selectedLocation)
      const selectedActivityItems = getSelectedItems(activities, selectedActivities)
      const selectedDressColorItem = getSelectedItem(dressColors, selectedDressColor)
      
      // Create animal string (handling multiple animals)
      const animalString = selectedAnimalItems.length > 1 
        ? selectedAnimalItems.slice(0, -1).map(a => a.name.toLowerCase()).join(', ') + ' and ' + selectedAnimalItems[selectedAnimalItems.length - 1].name.toLowerCase()
        : selectedAnimalItems[0]?.name.toLowerCase() || 'unicorn'
      
      // Create activity string (handling multiple activities)
      const activityString = selectedActivityItems.length > 1
        ? selectedActivityItems.slice(0, -1).map(a => a.name.toLowerCase()).join(', ') + ' and ' + selectedActivityItems[selectedActivityItems.length - 1].name.toLowerCase()
        : selectedActivityItems[0]?.name.toLowerCase() || 'dancing'
        // Location string
      const locationString = selectedLocationItem?.name.toLowerCase() || 'park'
      const dressColorString = selectedDressColorItem?.name.toLowerCase() || 'purple'
        // Custom Ghibli-style prompt with specific character description
      const defaultPrompt = `Create a magical watercolor painting dream representation of a 3 year old girl with tan skin and with curly black hair in pigtails wearing a very simple ${dressColorString} frock. In her dream she is with her ${animalString} friend in a ${locationString}. They are smiling as they are ${activityString} together. Keep the style very simple and childlike, and keep the focus on the activity of ${activityString}`
      
      // Use custom prompt if provided, otherwise use the personalized default
      const prompt = customPrompt ? customPrompt.replace('<animal>', animalString).replace('<location>', locationString).replace('<activity>', activityString).replace('<dress_color>', dressColorString) : defaultPrompt

      // === END CUSTOMIZABLE SECTION ===

      addDebugLog(`Generating image with prompt: "${prompt}"`)
      
      // Get API configuration from environment variables or fallback to defaults
      const apiEndpoint = import.meta.env?.VITE_AZURE_OPENAI_ENDPOINT || 'https://ai-sosattiaifoundryhub1041793570006.cognitiveservices.azure.com'
      const apiKey = import.meta.env?.VITE_AZURE_OPENAI_API_KEY || '2VNdaTlrtNcc5nOCOiaoqvmPsmmHbnvi0WsSuOKSY7aGFeCEn8NDJQQJ99BDACYeBjFXJ3w3AAAAACOGn1qE'
      
      if (!apiEndpoint || !apiKey) {
        throw new Error('Azure OpenAI configuration missing. Please check your .env file.')
      }
      
        const response = await fetch(`${apiEndpoint}/openai/deployments/dall-e-3/images/generations?api-version=2024-04-01-preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          style: "vivid"
        })
      })

      addDebugLog(`API Response Status: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        addDebugLog(`API Error: ${errorText}`)
        throw new Error(`API Error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      addDebugLog(`API Response Data: ${JSON.stringify(data)}`)
      
      if (data.data && data.data[0] && data.data[0].url) {
        setGeneratedImage({ url: data.data[0].url, loading: false })
        addDebugLog(`Image generated successfully: ${data.data[0].url}`)
      } else {
        throw new Error('No image URL in response')
      }
      
    } catch (error) {
      addDebugLog(`Error generating image: ${error}`)
      setGeneratedImage({ 
        url: '', 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    }
  }

  const getSelectedItems = (items: SelectionItem[], selectedIds: string[]): SelectionItem[] => {
    return items.filter(item => selectedIds.includes(item.id))
  }

  const getSelectedItem = (items: SelectionItem[], selectedId: string): SelectionItem | undefined => {
    return items.find(item => item.id === selectedId)
  }

  const generateDreamStory = () => {
    const selectedAnimalItems = getSelectedItems(animals, selectedAnimals)
    const selectedLocationItem = getSelectedItem(locations, selectedLocation)
    const selectedActivityItems = getSelectedItems(activities, selectedActivities)
    
    const animalNames = selectedAnimalItems.map(animal => animal.name).join(' and ')
    const locationName = selectedLocationItem?.name || 'a magical place'
    const activityNames = selectedActivityItems.map(activity => activity.name.toLowerCase()).join(' and ')
    
    return `Once upon a time, in a magical dream, there was a little girl who found herself in ${locationName}. She met her special friends: ${animalNames}! Together, they spent the most wonderful time ${activityNames}. It was the most amazing dream adventure ever! ✨`
  }

  const handleAnimalClick = (animalId: string) => {
    setSelectedAnimals(prev => 
      prev.includes(animalId)
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    )
  }

  const handleActivityClick = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    )
  }
  const createDream = async () => {
    if (selectedAnimals.length === 0 || !selectedLocation || selectedActivities.length === 0 || !selectedDressColor) {
      alert('Please select at least one animal, one location, one activity, and a dress color!')
      return
    }
    
    setDreamCreated(true)
    const dreamStory = generateDreamStory()
    addDebugLog(`Dream story created: ${dreamStory}`)
    
    // Generate the dream image
    await generateDreamImage(dreamStory)
  }
  const resetDream = () => {
    setDreamCreated(false)
    setSelectedAnimals([])
    setSelectedLocation('')
    setSelectedActivities([])
    setSelectedDressColor('')
    setGeneratedImage({ url: '', loading: false })
    setDebugLogs([])
  }
  return (
    <div className="app">
      <div className="container">        {/* Title Image */}
        <div className="title-image-container">
          <img 
            src="/Taras%20dreamland.png" 
            alt="Tara's Dreamland" 
            className="title-image"
          />
        </div>
        <p className="subtitle">Create your magical dream adventure!</p>
          {!dreamCreated ? (
          <>
            {/* Dress Color Selection */}
            <div className="section">
              <h2>Choose a dress color:</h2>
              <div className="selection-grid">
                {dressColors.map(color => (
                  <button
                    key={color.id}
                    className={`selection-item ${selectedDressColor === color.id ? 'selected' : ''}`}
                    onClick={() => setSelectedDressColor(color.id)}
                  >
                    <span className="emoji">{color.emoji}</span>
                    <span className="name">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Selection */}
            <div className="section">
              <h2>Choose your animal friends:</h2>
              <div className="selection-grid">
                {animals.map(animal => (
                  <button
                    key={animal.id}
                    className={`selection-item ${selectedAnimals.includes(animal.id) ? 'selected' : ''}`}
                    onClick={() => handleAnimalClick(animal.id)}
                  >
                    <span className="emoji">{animal.emoji}</span>
                    <span className="name">{animal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location Selection */}
            <div className="section">
              <h2>Choose your magical place:</h2>
              <div className="selection-grid">
                {locations.map(location => (
                  <button
                    key={location.id}
                    className={`selection-item ${selectedLocation === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <span className="emoji">{location.emoji}</span>
                    <span className="name">{location.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Selection */}
            <div className="section">
              <h2>Choose what you want to do:</h2>
              <div className="selection-grid">
                {activities.map(activity => (
                  <button
                    key={activity.id}
                    className={`selection-item ${selectedActivities.includes(activity.id) ? 'selected' : ''}`}
                    onClick={() => handleActivityClick(activity.id)}
                  >
                    <span className="emoji">{activity.emoji}</span>
                    <span className="name">{activity.name}</span>
                  </button>
                ))}
              </div>            </div>

            <button className="create-dream-btn" onClick={createDream}>
              Create My Dream! 🌟
            </button>
          </>
        ) : (          <div className="dream-result">
            <h2>Your Dream Adventure! ✨</h2>
            
            {/* Dream Image */}
            <div className="dream-image-container">
              {generatedImage.loading && (
                <div className="loading">
                  <div className="loading-spinner"></div>
                  <p>Creating your magical dream image... ✨</p>
                </div>
              )}
              
              {generatedImage.error && (
                <div className="error">
                  <p>Oops! There was a problem creating your dream image.</p>
                  <p className="error-details">{generatedImage.error}</p>
                </div>
              )}
              
              {generatedImage.url && (
                <div className="dream-image">
                  <img src={generatedImage.url} alt="Your Dream Adventure" />
                </div>
              )}
            </div>

            <button className="reset-btn" onClick={resetDream}>
              Create Another Dream! 🌙
            </button>
          </div>
        )}
      </div>
      
      {/* Create Dream Again Button - always visible */}
      <button 
        className="floating-btn"
        onClick={resetDream}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
        title="Create New Dream"
      >
        {dreamCreated ? '🌙' : '✨'}
      </button>
      
      {/* Debug Panel */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setDebugMode(!debugMode)}
          style={{
            background: 'rgba(0,0,0,0.1)',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {debugMode ? 'Hide Debug' : 'Show Debug'}
        </button>
        
        {debugMode && (
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: '#00ff00',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '10px',
            fontFamily: 'monospace',
            fontSize: '12px',
            maxHeight: '300px',
            overflow: 'auto',
            textAlign: 'left'
          }}>
            <h4 style={{ color: '#ffff00', marginBottom: '10px' }}>🎨 Custom Prompt Editor:</h4>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Create a Ghibli style dream representation of a 3 year old indian girl with curly black hair in pigtails wearing a <dress_color> dress. In her dream she is with her <animal> friend in a <location> and they are <activity> together."
              style={{
                width: '100%',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: '1px solid #333',
                borderRadius: '5px',
                padding: '10px',
                fontFamily: 'monospace',
                fontSize: '12px',
                resize: 'vertical'
              }}
            />
            <div style={{ fontSize: '10px', color: '#888', marginTop: '5px' }}>
              💡 Use &lt;animal&gt;, &lt;location&gt;, &lt;activity&gt;, and &lt;dress_color&gt; as placeholders. They'll be replaced with selections automatically!
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <div style={{ color: '#ffff00', fontSize: '12px', marginBottom: '5px' }}>🎨 Quick Prompt Templates:</div>
              <button 
                onClick={() => setCustomPrompt('Create a Disney Pixar style illustration of a 3 year old indian girl with curly black hair in pigtails wearing a <dress_color> dress. In her dream she is with her <animal> friend in a <location> and they are <activity> together.')}
                style={{ fontSize: '10px', margin: '2px', padding: '4px 8px', background: '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
              >
                Disney/Pixar Style
              </button>
              <button 
                onClick={() => setCustomPrompt('Create a magical watercolor painting showing a 3 year old indian girl with curly black hair in pigtails wearing a <dress_color> dress. In her dream she is with her <animal> friend in a <location> and they are <activity> together.')}
                style={{ fontSize: '10px', margin: '2px', padding: '4px 8px', background: '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
              >
                Watercolor Style
              </button>
              <button 
                onClick={() => setCustomPrompt('Create an anime/manga style illustration of a 3 year old indian girl with curly black hair in pigtails wearing a <dress_color> dress. In her dream she is with her <animal> friend in a <location> and they are <activity> together.')}
                style={{ fontSize: '10px', margin: '2px', padding: '4px 8px', background: '#333', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
              >
                Anime Style
              </button>
              <button 
                onClick={() => setCustomPrompt('')}
                style={{ fontSize: '10px', margin: '2px', padding: '4px 8px', background: '#666', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
              >
                Reset to Ghibli (Default)
              </button>
            </div>
              <h4 style={{ color: '#ffff00', marginTop: '20px', marginBottom: '10px' }}>Debug Logs:</h4>
            {debugLogs.length === 0 ? (
              <p>No logs yet. Try creating a dream!</p>
            ) : (
              debugLogs.map((log, index) => (
                <div key={index} style={{ marginBottom: '5px', wordBreak: 'break-all' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
