// to put the placeholder value as actual value in input in update form
$('input').each((index,value)=>{
    $(value).val($(value).attr('defaultValue'))
  })