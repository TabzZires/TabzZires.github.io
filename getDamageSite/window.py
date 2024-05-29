import tkinter
import tkinter.font
import tkinter.ttk
from tkinter.filedialog import askopenfilename
from tkinter import messagebox
from pygame import mixer
from webbrowser import open_new
import new

window = tkinter.Tk()
window.title('Get Damage')
window['bg'] = 'grey70'
music_name = "48bb90af8e1e401.mp3"
mixer.init()
play = False


def Music():
    mixer.music.load(music_name)
    global play
    play = not play
    if play:
        mixer.music.play(-1)
    else:
        mixer.music.stop()


def keyboard(event):
    if event.keysym == 'Tab':
        global music_name
        music_name = askopenfilename()
        if music_name == '':
            music_name = '48bb90af8e1e401.mp3'
    if event.keysym == 'm' or event.keycode == 77:
        Music()
    if event.keysym == 'b' or event.keycode == 66:
        DoBattle()
    if event.keysym == 'e' or event.keycode == 69:
        winArm1Create()
    if event.keysym == 'i' or event.keycode == 73:
        Info()


def validate_input(text):
    if text.isdigit() or text == "":
        return True
    else:
        return False


window.after(0, Music)
window.bind('<KeyPress>', keyboard)
armyF = new.Army()
armyS = new.Army()
defaultFont = tkinter.font.Font(family='Comic Sans MS', size=30)
window.option_add('*Font', defaultFont)


def winArm1Create():
    winArm = tkinter.Toplevel(window)
    winArm.focus_set()
    winArm.attributes('-topmost', True)
    winArm['bg'] = 'grey70'
    winArm.title('Создай первую армию')
    winArm.option_add('*Font', defaultFont)
    validate = winArm.register(validate_input)
    entryCountArm = tkinter.Entry(winArm, validate='key', validatecommand=(validate, '%P'))
    entryCountArm.insert(0, '1')
    warriorTypeCommonBoxArm = tkinter.ttk.Combobox(winArm, state='readonly')
    warriorTypeCommonBoxArm['values'] = ('Воин', 'Рыцарь', 'Защитник', 'Вампир', 'Копейщик')
    warriorTypeCommonBoxArm.set("Воин")
    entryCountArm.pack(pady='10', padx='5')
    warriorTypeCommonBoxArm.pack(pady='10', padx='5')

    def keyboardArm(event):
        if event.keysym == 'w' or event.keycode == 87:
            add()
        if event.keysym == 'e' or event.keycode == 69:
            DoWinArm2Create()
        if event.keycode == 27:
            winArm.destroy()

    def add():
        global Class
        match warriorTypeCommonBoxArm.get():
            case "Воин":
                Class = new.Warrior
            case 'Рыцарь':
                Class = new.Knight
            case "Защитник":
                Class = new.Defender
            case "Вампир":
                Class = new.Vampire
            case "Копейщик":
                Class = new.Lancer
        armyF.add_units(int(entryCountArm.get()), Class)

    def DoWinArm2Create():
        if len(armyF.units) > 0:
            winArm2Create()
            winArm.destroy()
        else:
            messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца')
            winArm.focus()

    submitBtnArm = tkinter.Button(winArm, text='Добавить', cursor='hand2', command=add)
    submitBtnArm.pack(pady='10', padx='5')
    btnArm2 = tkinter.Button(winArm, text="Создать Армию 2", cursor='hand2', command=DoWinArm2Create)
    btnArm2.pack(pady='10', padx='5')
    winArm.bind('<KeyPress>', keyboardArm)


def winArm2Create():
    winArm = tkinter.Toplevel(window)
    winArm.focus_set()
    winArm.attributes('-topmost', True)
    winArm['bg'] = 'grey70'
    winArm.title('Создай вторую армию')
    winArm.option_add('*Font', defaultFont)
    validate = winArm.register(validate_input)
    entryCountArm = tkinter.Entry(winArm, validate='key', validatecommand=(validate, '%P'))
    entryCountArm.insert(0, '1')
    warriorTypeCommonBoxArm = tkinter.ttk.Combobox(winArm, state='readonly')
    warriorTypeCommonBoxArm['values'] = ('Воин', 'Рыцарь', 'Защитник', 'Вампир', 'Копейщик')
    warriorTypeCommonBoxArm.set("Воин")
    entryCountArm.pack(pady='10', padx='5')
    warriorTypeCommonBoxArm.pack(pady='10', padx='5')

    def keyboardArm(event):
        if event.keysym == 'w' or event.keycode == 87:
            add()
        if event.keysym == 'e' or event.keycode == 69:
            Submit()
        if event.keycode == 27:
            if len(armyS.units) > 0:
                winArm.destroy()
            else:
                messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца')
                winArm.focus()

    def add():
        global Class
        match warriorTypeCommonBoxArm.get():
            case "Воин":
                Class = new.Warrior
            case 'Рыцарь':
                Class = new.Knight
            case "Защитник":
                Class = new.Defender
            case "Вампир":
                Class = new.Vampire
            case "Копейщик":
                Class = new.Lancer
        armyS.add_units(int(entryCountArm.get()), Class)

    def Submit():
        if len(armyS.units) > 0:
            winArm.destroy()
        else:
            messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца')
            winArm.focus()

    addBtnArm = tkinter.Button(winArm, text='Добавить', cursor='hand2', command=add)
    addBtnArm.pack(pady='10', padx='5')
    submitBtn = tkinter.Button(winArm, text='Подтвердить', cursor='hand2', command=Submit)
    submitBtn.pack(pady='10', padx='5')
    winArm.bind('<KeyPress>', keyboardArm)
    winArm.protocol("WM_DELETE_WINDOW",
                    lambda: (messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца'), winArm.focus()) if len(
                        armyS.units) < 1 else winArm.destroy())


def DoBattle():
    if len(armyF.units) > 0 and len(armyS.units) > 0:
        winStatus = tkinter.Label(window, text=(new.Battle(armyF, armyS)), background='grey70')
        winStatus.pack(pady='10', padx='5')
        armyF.units, armyS.units = [], []
    else:
        match ((len(armyF.units) > 0), (len(armyS.units) > 0)):
            case (False, False):
                messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца к каждой армии')
            case (True, False):
                messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца к второй армии')
            case (False, True):
                messagebox.showerror('Недостаточно бойцов', 'Добавьте хотя бы одного бойца к первой армии')


def Info():
    winInfo = tkinter.Toplevel(window)
    winInfo['bg'] = 'grey70'
    winInfo.focus_set()
    Link = tkinter.Label(winInfo, text='Сайт об игре', fg='blue', cursor='hand2', background='grey70')
    Link.pack()
    Link.bind('<Button-1>', lambda e: open_new('https://tabzzires.github.io'))
    Link.bind('<Enter>', lambda e: Link.configure(font=('Comic Sans MS', 30, 'underline')))
    Link.bind('<Leave>', lambda e: Link.configure(font=defaultFont))
    infoBtn = tkinter.Label(winInfo, background='grey70',
                            text='\nНачальное окно\n M/Ь - музыка\n I/Ш - информация\n E/У - создать армии\n B/И - битва между армиями\n\n Окна создания армий\n E/У - создать армию 2 или подтвердить\n W/Ц - добавить к армии\nEsc - закрыть окно\n\nОкно информации\nEsc - закрыть окно')
    infoBtn.pack()

    def keyboardInfo(event):
        if event.keycode == 27:
            winInfo.destroy()

    winInfo.bind('<KeyPress>', keyboardInfo)


btnArm = tkinter.Button(window, text="Создать армии", cursor='hand2', command=winArm1Create)
btnBattle = tkinter.Button(window, text="Битва", cursor='hand2', command=DoBattle)
frameMusic = tkinter.Frame(window)
frameInfo = tkinter.Frame(window)
frameMusic.configure(background='grey70')
frameInfo.configure(background='grey70')
btnMusic = tkinter.Button(frameMusic, text='Музыка', font=('Comic Sans MS', 10), cursor='hand2', command=Music)
btnInfo = tkinter.Button(frameInfo, text='Информация', font=('Comic Sans Ms', 10), cursor='hand2', command=Info)
btnArm.pack(pady='10', padx='5')
btnBattle.pack(pady='10', padx='5')
frameMusic.pack(side=tkinter.RIGHT)
frameInfo.pack(side=tkinter.LEFT)
btnInfo.pack(side=tkinter.BOTTOM, padx='5', pady='10')
btnMusic.pack(side=tkinter.BOTTOM, pady='10', padx='5')
window.protocol("WM_DELETE_WINDOW", lambda: exit())
window.mainloop()
