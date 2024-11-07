import pyautogui
from PIL import Image

def take_screenshot():
    # Take a screenshot
    screenshot = pyautogui.screenshot()
    return screenshot


def crop_image(image, left, top, right, bottom):
    # Crop the image
    cropped_image = image.crop((left, top, right, bottom))
    return cropped_image


def process_screenshot():
    # Take a screenshot
    screenshot = take_screenshot()

    # Define the coordinates to crop (left, top, right, bottom)
    left = 0
    top = 0
    right = 1980
    bottom = 900

    # Crop the screenshot
    cropped_image = crop_image(screenshot, left, top, right, bottom)

    # Save the cropped image (optional)
    cropped_image.save('cropped_image.png')
