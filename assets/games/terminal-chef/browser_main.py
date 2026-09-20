"""Browser adapter for Terminal Chef.

The game itself is vendored unmodified from TaydenWhite/terminal-chef. Upstream
`terminal_chef.main.main()` owns a blocking keyboard loop, which a browser tab
cannot run, so this module reproduces the same menu flow as a state machine that
JavaScript drives one keypress at a time. Game rules, rendering, and timing all
come from the real package.
"""

from terminal_chef.food import DISH_NAMES
from terminal_chef.game import Game, fastest_box, recipes_box, tutorial_box
from terminal_chef.main import LONG_GAME, MAIN_MENU, SHORT_GAME

CLEAR = '\033[2J\033[H'
GOODBYE = '   Thanks for playing. Press any key to return to the menu.'


class BrowserIO:
    """terminal_chef.game.ConsoleIO's interface, writing into xterm.js."""

    def __init__(self, write):
        self._write = write

    def line(self, text=''):
        self.raw(text + '\n')

    def raw(self, text):
        # A terminal emulator needs an explicit carriage return per newline.
        self._write(text.replace('\r\n', '\n').replace('\n', '\r\n'))


class Session:
    """One browser play session: main menu, games, and the peek screens."""

    def __init__(self, write):
        self.io = BrowserIO(write)
        self.game = None
        self.exited = False
        self.menu(clear=True)

    def menu(self, clear=False):
        self.game = None
        self.exited = False
        if clear:
            self.io.raw(CLEAR)
        self.io.line(MAIN_MENU)
        self.io.line('')

    def show(self, box):
        self.io.line(box.render())
        self.io.line('')
        self.menu()

    def press(self, key):
        """Handle one key. Returns True while the session wants more input."""
        if key is None:
            return True

        if self.game is not None:
            self.game.press(key)
            if self.game.over:
                self.menu()
            return True

        if self.exited:
            self.menu(clear=True)
        elif key in ('ESC', '6'):
            self.io.line(GOODBYE)
            self.io.line('')
            self.exited = True
        elif key == '1':
            self.start_game(SHORT_GAME)
        elif key == '2':
            self.start_game(LONG_GAME)
        elif key == '3':
            self.show(tutorial_box())
        elif key == '4':
            self.show(recipes_box(DISH_NAMES))
        elif key == '5':
            self.show(fastest_box())
        return True

    def start_game(self, spec):
        self.game = Game(self.io, **spec)
        self.game.start()
