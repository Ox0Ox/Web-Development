from flask import Flask, render_template, request, jsonify, send_from_directory
import pyttsx3
import random
import threading
import speech_recognition as sr
import google
import wikipedia
import webbrowser
import pywhatkit
import pyjokes
import os
import sys
import wolframalpha
import datetime
import requests
from bs4 import BeautifulSoup

client = wolframalpha.Client('Q8RVKU-55YG35L73A')

history = []

app = Flask(__name__)

@app.template_filter('newline_to_br')
def newline_to_br(text):
    return text.replace('\n', '<br>')

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tasks')
def tasks():
    return send_from_directory('static/react-integration', 'index.html')

@app.route('/history')
def history_page():
    return render_template('history.html', history=history)

def GoogleSearchResult(query):
    try:    
        searchResult = google.search(query)
        for result in searchResult:
            print(result.description.replace('...','').rsplit('.',3))
            speak(result.description.replace('...','').rsplit('.',3))
            break
    except:
        tabURL = "http://google.com/search?q="
        webbrowser.open(tabURL+query)
        speak('Got it.')

def init_engine():
    engine = pyttsx3.init('sapi5')
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[0].id)
    return engine

def speak(audio):
    def speak_thread(audio):
        engine = init_engine()
        engine.say(audio)
        engine.runAndWait()

    threading.Thread(target=speak_thread, args=(audio,)).start()

def myCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.energy_threshold = 200
        r.pause_threshold = 0.5
        audio = r.listen(source)
    try:
        print("Recognising...")
        query = r.recognize_google(audio, language='en-in')
        print('User: ' + query + '\n')
    except sr.UnknownValueError:
        speak('Pardon me sir. Could you please repeat.')
        return myCommand()
    return query

def clean_query(query):
    replacements = [
        'please', 'tell me about', 'do a', 'on ', 'favour',
        'do me a', 'could you', 'can you', 'about', 'tell me', 'flamber', 'who is', 'what is'
    ]
    for phrase in replacements:
        query = query.replace(phrase, '')
    return query.strip()

def process_query(cleaned_input):
    response = ""
    
    if 'open' in cleaned_input and 'folder' not in cleaned_input and 'file' not in cleaned_input:
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
        stMsgs = [ 'I am fine', 'I am full of energy', 'i am feeling energetic and im ready to comply!']
        response = random.choice(stMsgs)

    elif 'play' in cleaned_input:
        cleaned_input = cleaned_input.replace('play', '')
        response = "Playing" + cleaned_input
        pywhatkit.playonyt(cleaned_input)
        

    elif 'joke' in cleaned_input:
        jk1 = pyjokes.get_joke()
        response = jk1
            
    elif 'news' in cleaned_input or 'headlines' in cleaned_input:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
        resp = requests.get('https://www.wionews.com/', headers=headers)
        soup = BeautifulSoup(resp.content, 'html.parser')
        headlines = soup.find_all('p')
        headline15 = headlines[:15]
        x = 1
        for i in headline15:
            response += str(x) +') '+ i.text + '\n'
            x = x+1
        response += 'To know more visit wionnews.com'

    elif "what\'s up" in cleaned_input:
        stMsgs = ['Just doing my thing!','the sky','nothing much']
        response = random.choice(stMsgs)

    elif "who are you" in cleaned_input or 'your name' in cleaned_input or 'what are you' in cleaned_input:
        response = "I am Flamber, your personal assistant"

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
        response = "Sir the time is "+time
        

    elif 'the day' in cleaned_input:
        day = datetime.datetime.now()
        response = 'Today is '+day.strftime("%A")
    elif 'the date' in cleaned_input:
        day = datetime.datetime.now()
        response = 'The date is '+day.strftime("%D")

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
        

    elif "launch notepad" in cleaned_input:
        notePath = "C:\\Windows\\system32\\notepad.exe"
        response = "Launching notepad"
        os.startfile(notePath)
        

    elif "launch calculator" in cleaned_input:
        calcPath = "C:\\Windows\\system32\\calc.exe"
        response = "Launching calculator"
        os.startfile(calcPath)
        

    elif 'launch powerpoint' in cleaned_input or 'launch microsoft powerpoint' in cleaned_input or 'launch ms powerpoint' in cleaned_input:
        pptpath = 'C:\\Program Files\\Microsoft Office\\root\\Office16\\POWERPNT'
        response = 'Launching MS Powerpoint'
        os.startfile(pptpath)
        

    elif 'launch word' in cleaned_input or 'launch microsoft word' in cleaned_input or 'launch ms word' in cleaned_input:
        wordpath = 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD'
        response = 'Launching MS word'
        os.startfile(wordpath)
        

    elif 'launch vlc' in cleaned_input:
        vlcpath = "C:\\Program Files\\VideoLAN\VLC\\vlc.exe"
        response = 'launching vlc media player'
        os.startfile(vlcpath)
        

    elif "youtube" in cleaned_input and 'search' in cleaned_input:
        response = "searching youtube..."
        cleaned_input = cleaned_input.replace("youtube search","")
        print(cleaned_input)
        try:
            tabURL = 'https://www.youtube.com/results?search_query='
            webbrowser.open(tabURL+cleaned_input)
            
        except:
            speak('unable to connect')
            

    elif 'search' in cleaned_input and 'google' in cleaned_input:
        speak('searching google...')
        cleaned_input = cleaned_input.replace("google ","").replace('search ','')
        tabURL = "http://google.com/search?q="
        webbrowser.open(tabURL+cleaned_input)
        speak('Got it.')

    elif 'search' in cleaned_input and 'image' in cleaned_input:
        speak('searching google...')
        cleaned_input = cleaned_input.replace("image ","").replace('search ','')
        tabURL = "https://www.google.com/search?&q="+cleaned_input+"&tbm=isch&source=lnms"
        webbrowser.open(tabURL)
        speak('Got it.')

    elif 'hello' in cleaned_input:
        stMsgs = ['Hello Sir', 'Hello sir, always at your service']
        response = random.choice(stMsgs)

    elif "how are you" in cleaned_input:
        response = random.choice(['I am fine', 'I am full of energy', 'I am ready to comply!'])


    elif "search" in cleaned_input and 'google search' not in cleaned_input and 'search google' not in cleaned_input and 'youtube' not in cleaned_input:
        speak("searching...")
        cleaned_input = cleaned_input.replace("search","")
        try:
            try:
                res = client.query(cleaned_input)
                results = next(res.results).text or next(res.results).jpg or next(res.results).png
                response = results
                

            except:
                results = wikipedia.summary(cleaned_input, sentences = 2)
                response = results
                    

        except:
            response = 'got it'
            GoogleSearchResult(cleaned_input)
            

    else:
        cleaned_input = cleaned_input
        try:
            try:
                res = client.query(cleaned_input)
                results = next(res.results).text or next(res.results).jpg or next(res.results).png
                response = results
                

            except:
                results = wikipedia.summary(cleaned_input, sentences = 2)
                response = results
                    

        except:
            response = 'got it'
            GoogleSearchResult(cleaned_input)
                
        


    return response

@app.route('/process', methods=['POST'])
def process():
    query = request.form.get('query', '')  # Changed from `request.json.get` to `request.form.get`
    cleaned_input = clean_query(query)
    response = process_query(cleaned_input)
    speak(response)
    history.append({"query": query, "response": response})
    return jsonify({'response': response})

@app.route('/voice_command', methods=['POST'])  # Ensure this is POST
def voice_command():
    voice_input = myCommand()
    cleaned_input = clean_query(voice_input)
    response = process_query(cleaned_input)
    speak(response)
    history.append({"query": voice_input, "response": response})
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
