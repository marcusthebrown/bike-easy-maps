__author__ = 'mcenac'
import json

import pandas as pd

df = pd.read_csv('/Users/mcenac/Downloads/bike-thefts.tsv', delimiter='\t')
df.to_json('/tmp/thefts.json', orient='records')

with open('/tmp/thefts.json') as f:
    thefts = json.load(f)
    features = []
    for theft in thefts:
        if theft.get('Longitude') and theft.get('Latitude'):
            features.append({
                'id': theft['BE_ID'],
                'type': 'Feature',
                'properties': {
                    'title': theft['Theft_Title'],
                    'make': theft['Make'],
                    'description': theft['Description'],
                    'value': theft['Value'],
                    'location': theft['Location'],
                    'date': theft['Date'],
                    'time': theft['Time'],
                    'secured': theft['Secured'],
                    'secured_how': theft['Secured_How'],
                    'secured_what': theft['Secured_What'],
                    'recovered': theft['Recovered'],
                    'found_location': theft['Found_Location'],
                    'police_report_filed': theft['Police_Report']
                },
                'geometry': {'type': 'Point', 'coordinates': [theft['Longitude'], theft['Latitude']]}
            })
    with open('thefts.json', 'w') as outfile:
        outfile.write('{ "type": "FeatureCollection", "features":')
        json.dump(features[1:], outfile)
        outfile.write('}')

