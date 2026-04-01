import pynode_core
from browser import window, document, alert

document["run"].bind("click", pynode_core.save_code)
document["run"].bind("click", pynode_core.button_play)
document["stop"].bind("click", pynode_core.button_stop)
document["restart"].bind("click", pynode_core.button_restart)
