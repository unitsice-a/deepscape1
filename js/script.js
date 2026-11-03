const rates=[{code:"A",rate:0.00003},{code:"B",rate:0.00004},{code:"C",rate:0.00005}];
const won=value=>Math.round(value).toLocaleString("ko-KR")+"원";
let currentBest=rates[1];
function calculateFees(){
 const field=document.querySelector("#trade-amount"),amount=Number(field.value),hint=document.querySelector("#input-hint");
 if(!Number.isFinite(amount)||amount<1){hint.textContent="ⓘ　올바른 거래 금액을 1원 이상 입력해 주세요.";field.focus();return;}
 const results=rates.map(item=>({...item,fee:amount*item.rate}));
 currentBest=results.reduce((best,item)=>item.fee<best.fee?item:best);
 document.querySelector("#amount-banner").textContent="거래 금액: "+won(amount);
 document.querySelector("#broker-list").innerHTML=results.map(item=>`<article class="broker-card ${item.code===currentBest.code?"best":""}"><span class="broker-symbol">${item.code}</span><div class="broker-copy"><strong>증권사 ${item.code}</strong><small>수수료율 ${(item.rate*100).toFixed(3)}%</small></div><div class="fee-wrap"><strong class="fee">${won(item.fee)}</strong>${item.code===currentBest.code?'<span class="best-label">예시 최저</span>':""}</div></article>`).join("");
 document.querySelector("#result-explanation").textContent="입력한 거래 금액 "+won(amount)+"을 기준으로 비교한 결과, 증권사 "+currentBest.code+"의 가상 수수료가 가장 낮습니다.";
 document.querySelector("#detail-symbol").textContent=currentBest.code;document.querySelector("#detail-title").textContent="증권사 "+currentBest.code;
 document.querySelector("#detail-fee").innerHTML=won(currentBest.fee)+' <small>(수수료율 '+(currentBest.rate*100).toFixed(3)+'%)</small>';
 hint.textContent="계산이 완료되었습니다. 수수료 비교 화면에서 결과를 확인해 주세요.";showScreen("comparison");
}
function showScreen(id){document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"});document.querySelectorAll(".tab").forEach(tab=>tab.classList.toggle("active",tab.dataset.target===id));}
document.querySelector("#compare-button").addEventListener("click",calculateFees);
document.querySelector("#edit-amount").addEventListener("click",()=>showScreen("home"));
document.querySelector("#back-to-results").addEventListener("click",()=>showScreen("comparison"));
document.querySelector("#select-broker").addEventListener("click",()=>document.querySelector("#selection-message").classList.remove("hidden"));
document.querySelectorAll(".tab").forEach(tab=>tab.addEventListener("click",()=>showScreen(tab.dataset.target)));
