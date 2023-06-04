import sys
import pickle
import base64

# Read the base64 encoded data from command-line arguments
base64_data = sys.argv[1]

# Decode the base64 data
data = base64.b64decode(base64_data)

# Load the tfidfvect object from the data
tfidfvect = pickle.loads(data)

# Print the tfidfvect object as a JSON string
print(tfidfvect.to_json())
