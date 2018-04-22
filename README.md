# posm-paths

### dependencies

- pip 
 
```shell 
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py 
python get-pip.py
```
- virtualenv 
 
 ```
 pip install virtualenv
 ```

### Build

```shell
# cd the workding directory if needed
cd  ${your-path-to}/posm-paths
# create a virtual environment
virtualenv venv
# use the virutal environment
source ./venv/bin/activate
# download depenedencies
pip install -r requirements.txt
```

### Using Docker

```shell
# build the image
docker build -t posm-paths .
# run the image
docker run -it posm-paths /bin/bash
# then do the steps in the build section. the path is /home/posm-paths
```
