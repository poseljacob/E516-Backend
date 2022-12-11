import numpy as np
from PIL import Image, ImageOps

def transform(img):
    img = Image.open(img)
    img = ImageOps.grayscale(img)
    img = img.resize((128,128), Image.ANTIALIAS)
    img = np.array(img)
    img = img/255
    img = img.reshape(1,128,128,1)
    # pred = model.predict(img.reshape(1,128,128,1))
    # pred_gender = gender_dict[round(pred[0][0][0])]
    # pred_age = round(pred[1][0][0])
    return img
