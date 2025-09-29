"use client";

import React from "react";

export function MarqueeClients() {
  return (
    <section className="relative bg-[#334e4d] h-[160px] overflow-hidden">
      {/* Marquee content */}
      <div className="absolute h-[40px] top-[59px] overflow-hidden w-full">
        <div className="flex gap-[64px] items-center animate-marquee whitespace-nowrap group hover:animate-marquee-pause">
          {/* First set of client logos */}
          <div className="h-[27px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/a28f/d673/96bd52d02dc33b9ee5181168e77c187f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XrMad9N7jR24fT8Ulm1uSYgiZfY~Qsi19haMhrfGhyM5vJLNxhLFs98FbGjdVYAgEKrXpApeRU29XqLBIRuhT3sr3PwkCXjaVoTBEfFIpPjMH0-Y1U0yw5Ke-F1JcBxSWhnu1UZzukb4C0-SgJllQ3TYfvf0dZJdDLNHyvtbS2O4HdxzL0dyqBkdT9mGOz1GQHYOyNSUUCP~OVuhF2n84ptLyMclH~ZNYhxvP6gZRZ6TGlp5XH7g58DbPj4iylVgGkTQVmyadF4uePnS5rDi0OSoRocHLzGCfOEapC0kc6boZ-mr3IrK6SiGQwu9JyuEY-GWWs~V5oXL9PM5SJYHAw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[22px] w-[112px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/081c/e03a/aa75cffbd9531da99a8a8f09708c4489?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aQLk48BkjUtKDSfJBAWJEVvOIrBOk-N6LDp3I-nbAejm~GI04Ye7mFPrFnNmvRMVFyVi6rDgq3r5yUbDIUl3GNjyuDi4FptOgTrg4o~duuAKSKgrTXLsduMxwtTcZdTyjmeP49FxZu626mo3gSmEZn-TqmaTGX88rPQyuVdFIPJmBw~db4nB0KsaBBk4U2DOg~qaQCTgjd2PPUyRdR8g6iJs8RoZ1jsowNgbtgxFolmmor~fToKTRq~xeuE0cz3wDP4aEbdSRcfKqA2MD3Jrjo3z2JaVW9Py8STq7-0baujWYB~B5ks-yyzBS~Alv5Cn0JCOAY4IguJWps~95r7rxw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[40px] w-[93px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/b037/f877/2360865ce4c94883b2a979bfe30a5016?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dXiqVPrebwLqgA-dPkvyfaYVuHShI46udFGOZYwio4lpKws5pPukdfuiJyZGpYKiGldiWt9XWdnbEUEUioAouImRF7nfsDGVZRpUjB1swbsE-uwUawPGMqGc7aZjOI4n~uwgfnAfvj-DCSHmTFrUUPlbOEBxOzOKSPE~Lf3sp-HQeopWuEA19UaofZXorCVYVth10tk0TKCl-vP0yPoeiSDyO0yCYVV08uoP8hD7nirh81ed22Z7rZxEFv3PnfCOIcQYPViFe4aCchKdJ40ZjdiqqwdoyCviHHDI4eRTAyYm8hiPp8zeYBugDjobWX0HyqMVzbVoX7WCStE3v0st6A__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[19px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/c58f/8a3d/e44993a94abfd76440ef2235e2cdad76?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hVSVGjh3KqR5sYlcI-IPnYnnnxYwXwvUoDTEskGsVxr2ncE8BezC~F0rcA-tAq-2hcvvN90XqnhTidWTqoA9IE6WxnMLN~oYi5zFBCYN3UWvJ~aF8MraX7GZEIGurtzl7i09sQO2ryderBi9XwjyvnfkdAIxKlxMJRkjfgYaFyWK7BYsm9Q2PrWvhAipOGvX7zuC1gYdPwQz64XjqpFcuyd9Akk9nV3kQCRJAfS4dfFAPUtvn5tu6ph7k3xT2hB6usXpg4Xf6wBSaHiPvkjN97f1rPTJ1nPRwPc2h2DhhBqQCyeP~Dtu739zS54Z2iQdFAPftig2UHcKZa2247czYw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[39px] w-[106px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/5dad/7827/d5657238aaf72ddf092b55d4e6727aa5?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XhsJvAgdyhsSnqgx0mKMXklisNNx5Gh3SOBt3qBVrzr~bNsW-lrPQXo9TqQXYpwapEWaoq3bDDjiNY6lHLMMMS8nTbelrEEgKq7yduADtE95DXzg~B7SrZQlqKcCdJjwKgewSlA3s1FwoevkR4-M8Rmb1eMqluMViRbbWmfEcACUl2NQZYGiE3GOOP7n7lgyXvsG3ci6r1SWOsDuaqD8jRMKaoD1vAqOiM0J7Fn-zyRZqBDrYX4SgqmTGRQNZWGVqU8QNWJAQJ9W7rIAE05RR8FC7jlIcT1om~WynTNsepiySFhGa5AUyTOUlVAHjqivONvKsHc7FAXfrjKwSZBlgA__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Second set of client logos for seamless loop */}
          <div className="h-[27px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/a28f/d673/96bd52d02dc33b9ee5181168e77c187f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XrMad9N7jR24fT8Ulm1uSYgiZfY~Qsi19haMhrfGhyM5vJLNxhLFs98FbGjdVYAgEKrXpApeRU29XqLBIRuhT3sr3PwkCXjaVoTBEfFIpPjMH0-Y1U0yw5Ke-F1JcBxSWhnu1UZzukb4C0-SgJllQ3TYfvf0dZJdDLNHyvtbS2O4HdxzL0dyqBkdT9mGOz1GQHYOyNSUUCP~OVuhF2n84ptLyMclH~ZNYhxvP6gZRZ6TGlp5XH7g58DbPj4iylVgGkTQVmyadF4uePnS5rDi0OSoRocHLzGCfOEapC0kc6boZ-mr3IrK6SiGQwu9JyuEY-GWWs~V5oXL9PM5SJYHAw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[22px] w-[112px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/081c/e03a/aa75cffbd9531da99a8a8f09708c4489?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aQLk48BkjUtKDSfJBAWJEVvOIrBOk-N6LDp3I-nbAejm~GI04Ye7mFPrFnNmvRMVFyVi6rDgq3r5yUbDIUl3GNjyuDi4FptOgTrg4o~duuAKSKgrTXLsduMxwtTcZdTyjmeP49FxZu626mo3gSmEZn-TqmaTGX88rPQyuVdFIPJmBw~db4nB0KsaBBk4U2DOg~qaQCTgjd2PPUyRdR8g6iJs8RoZ1jsowNgbtgxFolmmor~fToKTRq~xeuE0cz3wDP4aEbdSRcfKqA2MD3Jrjo3z2JaVW9Py8STq7-0baujWYB~B5ks-yyzBS~Alv5Cn0JCOAY4IguJWps~95r7rxw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[40px] w-[93px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/b037/f877/2360865ce4c94883b2a979bfe30a5016?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dXiqVPrebwLqgA-dPkvyfaYVuHShI46udFGOZYwio4lpKws5pPukdfuiJyZGpYKiGldiWt9XWdnbEUEUioAouImRF7nfsDGVZRpUjB1swbsE-uwUawPGMqGc7aZjOI4n~uwgfnAfvj-DCSHmTFrUUPlbOEBxOzOKSPE~Lf3sp-HQeopWuEA19UaofZXorCVYVth10tk0TKCl-vP0yPoeiSDyO0yCYVV08uoP8hD7nirh81ed22Z7rZxEFv3PnfCOIcQYPViFe4aCchKdJ40ZjdiqqwdoyCviHHDI4eRTAyYm8hiPp8zeYBugDjobWX0HyqMVzbVoX7WCStE3v0st6A__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[19px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/c58f/8a3d/e44993a94abfd76440ef2235e2cdad76?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hVSVGjh3KqR5sYlcI-IPnYnnnxYwXwvUoDTEskGsVxr2ncE8BezC~F0rcA-tAq-2hcvvN90XqnhTidWTqoA9IE6WxnMLN~oYi5zFBCYN3UWvJ~aF8MraX7GZEIGurtzl7i09sQO2ryderBi9XwjyvnfkdAIxKlxMJRkjfgYaFyWK7BYsm9Q2PrWvhAipOGvX7zuC1gYdPwQz64XjqpFcuyd9Akk9nV3kQCRJAfS4dfFAPUtvn5tu6ph7k3xT2hB6usXpg4Xf6wBSaHiPvkjN97f1rPTJ1nPRwPc2h2DhhBqQCyeP~Dtu739zS54Z2iQdFAPftig2UHcKZa2247czYw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[39px] w-[106px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/5dad/7827/d5657238aaf72ddf092b55d4e6727aa5?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XhsJvAgdyhsSnqgx0mKMXklisNNx5Gh3SOBt3qBVrzr~bNsW-lrPQXo9TqQXYpwapEWaoq3bDDjiNY6lHLMMMS8nTbelrEEgKq7yduADtE95DXzg~B7SrZQlqKcCdJjwKgewSlA3s1FwoevkR4-M8Rmb1eMqluMViRbbWmfEcACUl2NQZYGiE3GOOP7n7lgyXvsG3ci6r1SWOsDuaqD8jRMKaoD1vAqOiM0J7Fn-zyRZqBDrYX4SgqmTGRQNZWGVqU8QNWJAQJ9W7rIAE05RR8FC7jlIcT1om~WynTNsepiySFhGa5AUyTOUlVAHjqivONvKsHc7FAXfrjKwSZBlgA__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Third set of client logos for extra smoothness */}
          <div className="h-[27px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/a28f/d673/96bd52d02dc33b9ee5181168e77c187f?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XrMad9N7jR24fT8Ulm1uSYgiZfY~Qsi19haMhrfGhyM5vJLNxhLFs98FbGjdVYAgEKrXpApeRU29XqLBIRuhT3sr3PwkCXjaVoTBEfFIpPjMH0-Y1U0yw5Ke-F1JcBxSWhnu1UZzukb4C0-SgJllQ3TYfvf0dZJdDLNHyvtbS2O4HdxzL0dyqBkdT9mGOz1GQHYOyNSUUCP~OVuhF2n84ptLyMclH~ZNYhxvP6gZRZ6TGlp5XH7g58DbPj4iylVgGkTQVmyadF4uePnS5rDi0OSoRocHLzGCfOEapC0kc6boZ-mr3IrK6SiGQwu9JyuEY-GWWs~V5oXL9PM5SJYHAw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[22px] w-[112px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/081c/e03a/aa75cffbd9531da99a8a8f09708c4489?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aQLk48BkjUtKDSfJBAWJEVvOIrBOk-N6LDp3I-nbAejm~GI04Ye7mFPrFnNmvRMVFyVi6rDgq3r5yUbDIUl3GNjyuDi4FptOgTrg4o~duuAKSKgrTXLsduMxwtTcZdTyjmeP49FxZu626mo3gSmEZn-TqmaTGX88rPQyuVdFIPJmBw~db4nB0KsaBBk4U2DOg~qaQCTgjd2PPUyRdR8g6iJs8RoZ1jsowNgbtgxFolmmor~fToKTRq~xeuE0cz3wDP4aEbdSRcfKqA2MD3Jrjo3z2JaVW9Py8STq7-0baujWYB~B5ks-yyzBS~Alv5Cn0JCOAY4IguJWps~95r7rxw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[40px] w-[93px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/b037/f877/2360865ce4c94883b2a979bfe30a5016?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dXiqVPrebwLqgA-dPkvyfaYVuHShI46udFGOZYwio4lpKws5pPukdfuiJyZGpYKiGldiWt9XWdnbEUEUioAouImRF7nfsDGVZRpUjB1swbsE-uwUawPGMqGc7aZjOI4n~uwgfnAfvj-DCSHmTFrUUPlbOEBxOzOKSPE~Lf3sp-HQeopWuEA19UaofZXorCVYVth10tk0TKCl-vP0yPoeiSDyO0yCYVV08uoP8hD7nirh81ed22Z7rZxEFv3PnfCOIcQYPViFe4aCchKdJ40ZjdiqqwdoyCviHHDI4eRTAyYm8hiPp8zeYBugDjobWX0HyqMVzbVoX7WCStE3v0st6A__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[19px] w-[135px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/c58f/8a3d/e44993a94abfd76440ef2235e2cdad76?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hVSVGjh3KqR5sYlcI-IPnYnnnxYwXwvUoDTEskGsVxr2ncE8BezC~F0rcA-tAq-2hcvvN90XqnhTidWTqoA9IE6WxnMLN~oYi5zFBCYN3UWvJ~aF8MraX7GZEIGurtzl7i09sQO2ryderBi9XwjyvnfkdAIxKlxMJRkjfgYaFyWK7BYsm9Q2PrWvhAipOGvX7zuC1gYdPwQz64XjqpFcuyd9Akk9nV3kQCRJAfS4dfFAPUtvn5tu6ph7k3xT2hB6usXpg4Xf6wBSaHiPvkjN97f1rPTJ1nPRwPc2h2DhhBqQCyeP~Dtu739zS54Z2iQdFAPftig2UHcKZa2247czYw__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
          <div className="h-[39px] w-[106px] flex-shrink-0 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-lg">
            <div className="h-full w-full overflow-hidden">
              <img
                src="https://s3-alpha-sig.figma.com/img/5dad/7827/d5657238aaf72ddf092b55d4e6727aa5?Expires=1759708800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XhsJvAgdyhsSnqgx0mKMXklisNNx5Gh3SOBt3qBVrzr~bNsW-lrPQXo9TqQXYpwapEWaoq3bDDjiNY6lHLMMMS8nTbelrEEgKq7yduADtE95DXzg~B7SrZQlqKcCdJjwKgewSlA3s1FwoevkR4-M8Rmb1eMqluMViRbbWmfEcACUl2NQZYGiE3GOOP7n7lgyXvsG3ci6r1SWOsDuaqD8jRMKaoD1vAqOiM0J7Fn-zyRZqBDrYX4SgqmTGRQNZWGVqU8QNWJAQJ9W7rIAE05RR8FC7jlIcT1om~WynTNsepiySFhGa5AUyTOUlVAHjqivONvKsHc7FAXfrjKwSZBlgA__"
                alt="Client logo"
                className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 h-full w-[160px] bg-gradient-to-r from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>

      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 h-full w-[160px] bg-gradient-to-l from-[#334e4d] to-[rgba(51,78,77,0)] pointer-events-none z-10"></div>
    </section>
  );
}