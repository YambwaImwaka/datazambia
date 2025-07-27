import json
import re

with open('cdf.txt') as f:
    data = json.load(f)['data']

def normcat(c):
    c = c.strip().capitalize()
    c = c.replace('busaries', 'Bursaries').replace('burseries', 'Bursaries')
    return c

def normsub(s):
    s = s.strip()
    s = s.replace('secondary boarding', 'Secondary Boarding School')
    s = s.replace('skills development', 'Skills Development')
    s = s.replace('secondary school', 'Secondary School')
    s = s.replace('development', 'Development')
    s = s.replace('n/a', 'N/A')
    return s

def parse_amt(a):
    if not a or a.strip() in ['', '0']:
        return 0
    return float(re.sub(r'[^\d.]', '', a))

out = [
    {
        'constituency': r['Constituency'].strip(),
        'category': normcat(r['category']),
        'subCategory': normsub(r['Sub category']),
        'amount': parse_amt(r['Amount'])
    }
    for r in data
]

with open('cdfData.out.ts', 'w') as f:
    f.write('export const cdfData = ')
    json.dump(out, f, indent=2)
    f.write(';\n') 