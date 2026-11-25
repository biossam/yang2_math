import re,datetime,sys
D='/home/claude/nm/'
s=open(D+'src/core.html').read()
content=''.join(open(D+'src/'+f).read()+'\n' for f in ['c0_helpers.js','c1_g12.js','c2_g34.js','c3_g56.js','c9_tail.js'])
pets=open(D+'src/pets.js').read()
css=open(D+'minihome/room.css').read()+open(D+'minihome/party.css').read()+open(D+'minihome/jibsa.css').read()+open(D+'src/extra.css').read()
js=open(D+'minihome/room.js').read()+open(D+'minihome/jibsa.js').read()+open(D+'minihome/party.js').read()
for k,v in [('/*@CONTENT@*/',''),('/*@CONTENT2@*/',content),('/*@PETS@*/',pets),('/*@MODCSS@*/',css),('/*@MODJS@*/',js)]:
    assert s.count(k)==1,k; s=s.replace(k,v)
ver=datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None)+datetime.timedelta(hours=9)
s=re.sub(r'var APPVER="[^"]*"','var APPVER="%s"'%ver.strftime('%m-%d %H:%M'),s,count=1)
open(D+'app.html','w').write(s);print('built',len(s))
