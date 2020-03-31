# OSPW

### Open Signal Processing Workstation

The OSPW is a Linux-based open software platform, designed for rapid prototyping and the development of digital signal processing (DSP) audio algorithms and corresponding user interfaces (UIs).

#### Hardware Requirements

The OSPW can run on any computer capable of running the following software components:

- Any Linux Distribution with ALSA Support
- [Pd](https://github.com/pure-data/pure-data)
- [Node.js](https://nodejs.org/en/)

#### Installation Instructions

The OSPW components in this repository should be installed on a freshly setup Linux operating system. Before setting up the OSPW, make sure to install [Pd](https://github.com/pure-data/pure-data) and [Node.js](https://nodejs.org/en/).

- To install the OSPW, clone this Repository to your home directory: `git clone https://github.com/clemofi/ospw.git`
- `cd` into the created *ospw* directory
- Install the Node.js dependencies: `npm install`
- Install the *ui* submodule: `git submodule update --init --recursive`
- In the file `ospw.sh` correct the path to match your location of the file.

For starting the OSPW on boot, different methods can be used, depending on the linux distribution. There is a systemd service file in the install folder, that has to be customized manually or with the `setup-service.js` script. After editing, this file has to be placed in one of the locations that are used by sytemd, for example `/etc/systemd/user`. There the permissions have to be set and the service can be enabled.

- `cd install`
- `node setup-service.js `
- `sudo cp ospw.service /etc/systemd/user/`
- `sudo systemctl daemon-reload`
- `sudo chmod 644 /etc/systemd/user/ospw.service`
- `sudo systemctl enable ospw`

On some Linux distributions, PulseAudio can be a problem for Pd. For the OSPW to work, it is advised to deactivate PulseAudio. This can be achieved by adding the line `autospawn = no` to `/etc/pulse/client.conf`.

#### Usage

To start the OSPW Server, simply run the `ospw.sh` script or directly via node: `node server.js` from the main OSPW folder.

From a client device, connect to the OSPW through a network connection and open the OSPW Web interface in a browser by entering its IP address or hostname and port 8888 (e.g. `ospw.local:8888`)

There the demo applications can be tested. They consist of a 16 Channel Insert Mixer, a binaural renderer and a multichannel reverb.
Additionally, custom Pd patches can be uploaded to and run by the OSPW.

For the creation of custom Pd patches, the standard audio in- and outputs can be used.
To get the OSPW to automatically create interface objects, create a string (in a Pd comment) for each parameter that has to be controllable.

The syntax for the string is */ospw/x/y/widgettype/parameterName/initValue*

- The string has to start with *'/ospw'*
- *x* and *y* are grid coordinates for placing the object within a symmetric grid
- */widgettype* defines the generated interface object. Possible values are `button`, `toggle`, `number`, `dial`, `hslider`, `vslider`.
- */parameterName* can be chosen freely and results in the rendered widget label.
- */initValue* initializes the interface object with the entered value.
