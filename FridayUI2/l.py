if smthg:
    sfda
elif 'open' in cleaned_input and 'folder' not in cleaned_input and 'file' not in cleaned_input:
    cleaned_input = cleaned_input.replace('open ','')
    response = 'opening'+cleaned_input
    anyURL = 'www.'+cleaned_input+'.com'
    webbrowser.open(anyURL)
    

elif 'open folder' in cleaned_input:
    try:
        response = 'opening'+cleaned_input
        os.system('explorer C:\\HARSH PATNAIK\\"{}"'.format(cleaned_input.replace('open folder ','')))
        
    except:
        response = 'Folder not found'
        


elif "wikipedia" in cleaned_input:
    speak("searching wikipedia...")
    cleaned_input = cleaned_input.replace("wikipedia","")
    results = wikipedia.summary(cleaned_input, sentences = 2)
    speak("According to wikipedia")
    response = results
    

elif 'how are you' in cleaned_input:
    stMsgs = [ 'I am fine', 'i was wondering the same thing', 'I am full of energy', 'i am feeling energetic and im ready to comply!']
    response = random.choice(stMsgs)

elif 'play' in cleaned_input:
    cleaned_input = cleaned_input.replace('play', '')
    response = "Playing" + cleaned_input
    pywhatkit.playonyt(cleaned_input)
    

elif 'joke' in cleaned_input:
    jk1 = pyjokes.get_joke()
    response = jk1
        

elif "what\'s up" in cleaned_input:
    stMsgs = ['Just doing my thing!','the sky','nothing much']
    response = random.choice(stMsgs)

elif "who are you" in cleaned_input or 'what is your name' in cleaned_input or 'what are you' in cleaned_input:
    response = "I am Friday, your personal assistant"

elif 'sibling' in cleaned_input or 'brother' in cleaned_input or 'sister' in cleaned_input and 'your' in cleaned_input:
    response = 'We are here to talk about you, not me'

elif 'good morning' in cleaned_input or 'good afternoon' in cleaned_input or 'good evening' in cleaned_input:
    hour = int(datetime.datetime.now().hour)
    if hour >=0 and hour<12:
        response = 'good morning'
    elif hour >=12 and hour <18:
        response = 'good afternoon'
    else:
        response = "good evening"


elif 'what can you do' in cleaned_input:
    response = 'here are a few thing which i can do \nopen websites, launch applications, search the web and communicate with you'

elif "the time" in cleaned_input:
    time = datetime.datetime.now().strftime("%H:%M")
    response = "Sir the time is"+time
    

elif 'the day' in cleaned_input:
    day = datetime.datetime.now()
    response = 'today is'+_day.strftime("%A")

elif 'shutdown' in cleaned_input and 'computer':
    stMsgs = ['Goodbye sir. hope you have a great day.',"until next time"]
    response = 'shutting down'+random.choice(stMsgs)
    os.system('shutdown -s')
    os.system('TASKKILL /F /IM code.exe')
    sys.exit()

elif 'restart' in cleaned_input and 'computer':
    print('restarting...')
    stMsgs = ['Goodbye sir. hope you have a great day.',"until next time"]
    response = 'restarting'+random.choice(stMsgs)
    os.system('shutdown -r')
    os.system('TASKKILL /F /IM code.exe')
    sys.exit()

elif 'hello' in cleaned_input or 'hey' in cleaned_input:
    stMsgs = ['Hello Sir', 'Hello sir, always at your service']
    response = random.choice(stMsgs)
    

elif "launch notepad" in cleaned_input:
    notePath = "C:\\Windows\\system32\\notepad.exe"
    response = "Launching notepad"
    os.startfile(notePath)
    

elif "launch calculator" in cleaned_input:
    calcPath = "C:\\Windows\\system32\\calc.exe"
    response = "Launching calculator"
    os.startfile(calcPath)
    

elif 'launch powerpoint' in cleaned_input or 'launch microsoft powerpoint' in cleaned_input or 'launch ms powerpoint' in cleaned_input:
    pptpath = 'C:\\Program Files (x86)\\Microsoft Office\\Office14\\POWERPNT'
    response = 'launching MS powerpoint'
    os.startfile(pptpath)
    

elif 'launch word' in cleaned_input or 'launch microsoft word' in cleaned_input or 'launch ms word' in cleaned_input:
    wordpath = 'C:\\Program Files (x86)\\Microsoft Office\\Office14\\WINWORD'
    response = 'launching MS word'
    os.startfile(wordpath)
    

elif 'launch paint' in cleaned_input or 'launch microsoft paint' in cleaned_input or 'launch ms paint' in cleaned_input:
    paintpath = 'C:\\Windows\\system32\\mspaint'
    response = 'launching MS paint'
    os.startfile(paintpath)
    

elif 'launch vlc' in cleaned_input:
    vlcpath = "C:\\Program Files (x86)\\VideoLAN\VLC\\vlc.exe"
    response = 'launching vlc media player'
    os.startfile(vlcpath)
    

elif "youtube" in cleaned_input and 'search' in cleaned_input:
    response = "searching youtube..."
    speak('searching youtube...')
    cleaned_input = cleaned_input.replace("youtube search","")
    try:
        tabURL = "https://www.youtube.com/results?search_cleaned_input="
        webbrowser.open(tabURL+cleaned_input)
        
    except:
        speak('unable to connect')
        

elif 'search' in cleaned_input and 'google' in cleaned_input:
    speak('searching google...')
    cleaned_input = cleaned_input.replace("google ","").replace('search ','')
    tabURL = "http://google.com/search?q="
    webbrowser.open(tabURL+cleaned_input)
    speak = 'Got it.'
    


elif "search" in cleaned_input and 'google search' not in cleaned_input and 'search google' not in cleaned_input and 'youtube' not in cleaned_input:
    speak("searching...")
    cleaned_input = cleaned_input.replace("search","")
    try:
            try:
                res = client.cleaned_input(cleaned_input)
                results = next(res.results).text or next(res.results).jpg or next(res.results).png
                speak(results)
                response = results
                

            except:
                results = wikipedia.summary(cleaned_input, sentences = 2)
                speak(results)
                response = results
                

    except:
        response = 'got it'
        GoogleSearchResult(cleaned_input)
        

else:
    cleaned_input = cleaned_input
    try:
        try:
            res = client.cleaned_input(cleaned_input)
            results = next(res.results).text or next(res.results).jpg
            speak(results)
            response = results
            

        except:
            results = wikipedia.summary(cleaned_input, sentences = 2)
            speak(results)
            response = results
            

    except:
        GoogleSearchResult(cleaned_input)
        