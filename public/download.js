function downloadVoucher(trnid){var url,tok,requesturl=localStorage.getItem("url")+"/general/accounts/jasper/download/voucher?trnIds="+trnid+"&access_token="+encodeURIComponent(localStorage.getItem("tok"));window.open(requesturl,"_blank")}