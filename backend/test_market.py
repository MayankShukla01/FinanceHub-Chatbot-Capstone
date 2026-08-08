import requests

r = requests.get("http://127.0.0.1:8000/api/market-data", timeout=120)
d = r.json()
print("Status:", r.status_code)
print("Indices:", len(d.get("indices", [])), "| Stocks:", len(d.get("stocks", [])))
print("Last Updated:", d.get("lastUpdated", ""))

if d.get("error"):
    print("ERROR:", d["error"])

for x in d.get("indices", []):
    has_hist = "history" in x and len(x["history"]) > 0
    print(f"  [INDEX] {x['name']}: Rs.{x['current']:,.2f} ({x['changePct']:+.2f}%) | History: {len(x.get('history',[])) } points")

for x in d.get("stocks", []):
    has_hist = "history" in x and len(x["history"]) > 0
    print(f"  [STOCK] {x['name']}: Rs.{x['current']:,.2f} ({x['changePct']:+.2f}%) | History: {len(x.get('history',[])) } points")
