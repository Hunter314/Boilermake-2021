conda create -n lpr
conda activate lpr
sudo apt install python-pip
pip install numpy==1.16
pip install tensorflow==1.5.0
pip install keras==2.2.4
git clone https://github.com/sergiomsilva/alpr-unconstrained.git
cd alpr-unconstrained
bash get-networks.sh
cd darknet && make
cd ..
echo "Done!"
