//================================= Locust.Form =================================
(function (w) {
    function __error(msg) {
		if (w.console && w.console.error) {
			w.console.error(msg);
		} else {
			throw msg;
		}
	}
	if (!w) {
        throw "Locust.Form: no context given (use 'Locust.Base.js')";
    }
    if (!w.Locust) {
		__error("Locust.Form: Locust namespace not found (use 'Locust.Base.js')");
		return;
    }
	if (!w.Locust.Logging) {
		__error("Locust.Form: Locust.Logging namespace not found (use 'Locust.Logging.js')");
		return;
	}
	if (!w.jQuery) {
        __error("Locust.Form: jQuery library not found");
        return;
    }
    if (!w.Locust.Form) {
        w.Locust.Form = {};
    }
    w.Locust.Form.Post = function (url, args) {
        var f = w.jQuery("<form>").attr('method', 'POST').attr('action', url).insertAfter(w.jQuery("body"));
		
        w.jQuery.each(args, function (propName, propValue) {
            w.jQuery('<input>').attr('type', 'hidden').attr('name', propName).val(propValue).appendTo(f);
        });
		
        f.submit();
    }
	
	//Form Element Types:
    // 		"text"
    // 		"email"
    // 		"password"
    // 		"tel"
    // 		"color"
    // 		"date"
    // 		"datetime"
    // 		"datetime-local"
    // 		"month"
    // 		"number"
    // 		"range"
    // 		"search"
    // 		"time"
    // 		"textarea"
    // 		"radio"
    // 		"file"
    // 		"select-one"
    // 		"select-multiple"
    // 		"url"
    // 		"week"
    // 		"hidden"
	if (!w.Locust.Form.DefaultExclude) {
        w.Locust.Form.DefaultExclude = function (e) {
			var tag = e.tagName.toLowerCase();
			var type = e.type.toLowerCase();

			return w.jQuery(e).hasClass("exclude") || tag == "button" || (tag == "input" && (type == "image" || type == "button" || type == "submit" || type == "reset"));
		}
	}
	if (!w.Locust.Form.Each) {
        w.Locust.Form.Each = function (selector, fnProcess, excludes) {
            w.jQuery(selector).each(function (index, frm) {
                if (w.jQuery(frm).prop("tagName").toLowerCase() == 'form') {
                    var elems = frm.elements;
					
                    if (elems && w.jQuery.isFunction(fnProcess)) {
						var _exclude;
						
						if (!w.jQuery.isFunction(excludes)) {
							_exclude = w.Locust.Form.DefaultExclude;
						} else {
							_exclude = excludes;
						};
						
                        for (var i = 0; i < elems.length; i++) {
                            var e = elems[i];
							
                            if (!_exclude(e, i, frm, index)) {
                                fnProcess(e, i, frm, index);
                            }
                        }
                    }
                }
            });
        }
    }
	if (!w.Locust.Form.ToJson) {
        w.Locust.Form.ToJson = function (formSelector, excludes) {
			var lastForm;
            var json = {};
			var result = [];
			var frmCnt = 0;
			
            w.Locust.Form.Each(formSelector, function (e, elementIndex, frm, frmIndex) {
				if (lastForm == undefined) {
					lastForm = frm;
				}
				if (lastForm != frm) {
					result.push({ "index": frmIndex, "form": frm, "data": json });
					json = {};
					lastForm = frm;
					frmCnt++;
				}
				var value = w.jQuery(e).val();
				var key = e.name || e.id;
				
				if (key) {
					if (json.hasOwnProperty(key)) {
						if (w.jQuery.isArray(json[key])) {
							json[key].push(value);
						} else {
							json[key] = new Array(json[key], value);
						}
					} else {
						if (w.jQuery(e).attr("value") != undefined) {
							json[key] = value;
						} else {
							if (e.checked) {
								json[key] = e.checked;
							} else {
								json[key] = value;
							}
						}
					}
				}
            }, excludes);
			
			if (frmCnt < w.jQuery(formSelector).length) {
				result.push({ "index": frmCnt, "form": lastForm, "data": json });
			}
			
			if (result.length == 0)
				return {};
			if (result.length == 1)
				return result[0].data;
            
			return result;
        }
    }
	if (!w.Locust.Form.LoadJson) {
        w.Locust.Form.LoadJson = function (formSelector, data, excludes) {
			var lastForm;
            var json;
			
			w.Locust.Form.Each(formSelector, function (e, elementIndex, frm, frmIndex) {
				if (lastForm != frm || json == undefined) {
					lastForm = frm;
					
					if (w.jQuery.isArray(data)) {
						if (data.length > frmIndex) {
							if (data[frmIndex].data != undefined) {
								json = data[frmIndex].data;
							} else {
								json = data[frmIndex];
							}
						} else {
							json = undefined;
						}
					} else {
						json = data;
					}
				}
				
				if (json != undefined) {
					var key = e.name || e.id;
					
					if (e.type == "checkbox" || e.type == "radio") {
						if (w.jQuery.isArray(json[key])) {
							w.jQuery(e).prop('checked', json[key].indexOf(w.jQuery(e).val()) >= 0);
						} else {
							w.jQuery(e).prop('checked', json[key]);
						}
					} else {
						w.jQuery(e).val(json[key]);
					}
				}
            }, excludes);
		}
	}
	if (!w.Locust.Form.Reset) {
        w.Locust.Form.Reset = function (formSelector, excludes) {
            w.Locust.Form.Each(formSelector, function (e, elementIndex, frm, frmIndex) {
				if (e.type == "checkbox" || e.type == "radio") {
					w.jQuery(e).prop('checked', false);
				} else if (e.type == "select") {
					w.jQuery(e).html('');
				} else {
					w.jQuery(e).val('');
				}
            }, excludes);
        }
    }
	if (!w.Locust.Form.Disable) {
        w.Locust.Form.Disable = function (formSelector, excludes) {
            w.Locust.Form.Each(formSelector, function (e, elementIndex, frm, frmIndex) {
                w.jQuery(e).prop('disabled', 'disabled');
            }, excludes);
        }
    }
    if (!w.Locust.Form.Enable) {
        w.Locust.Form.Enable = function (formSelector, excludes) {
            w.Locust.Form.Each(formSelector, function (e, elementIndex, frm, frmIndex) {
                w.jQuery(e).removeAttr('disabled');
            }, excludes);
        }
    }
	/*
		This methods is created especially to use in ASP.NET MVC applications.
		
		In ASP.NET MVC when sending object models containing collections to the server,
		they must be in a specific format. For example to send an array of Persons to the server,
		in order for the MVC's model binder to be able to distinguish person objects, each property must
		have a prefix in {object}[index].{property} format like "person[0].name", "person[0].age".
		
		MVC Html Helpers in MVC views already produce approriate output for object models.
		For example in the following view ...
		
		@model List<Person>
		@for (var i = 0; i < Model.Count; i++)
		{
			@Html.TextBoxFor(p => p[i].Name);
			@Html.TextBoxFor(p => p[i].Age);
		}
		
		... MVC generates the following output:
		
		<form method="post" action="/Book/Authors">

			<input type="text" name="[0].Name" value="Curious George" />
			<input type="text" name="[0].Age" value="24" />
			
			<input type="text" name="[1].Name" value="Steve McConnell" />
			<input type="text" name="[1].Age" value="25" />
			
			<input type="text" name="[2].Name" value="JRR Tolkien" />
			<input type="text" name="[2].Age" value="26" />
			
			<input type="submit" />
		</form>
		
		But if you plan to send form data using ajax to the server you need to format your array of data
		to be in MVC shape so that the MVC model binder can extract them out of the request and create a List<> object.
		
		In such situation this MvcArray() utility method will be helpful. This is especially useful when you are using a javascript Grid.
		
		example:
			MvcArray([
						{ name: "ali", age: 24 },
						{ name: "reza", age: 25 },
						{ name: "saeed", age: 26 },
					 ],"")
			output: [
						{ "[0].name": "ali",   "[0].age": 24 },
						{ "[1].name": "reza",  "[1].age": 25 },
						{ "[2].name": "saeed", "[2].age": 26 }
					]
			
			if you specify a value for the "name" argument, it will be added to each preprty.
			
			MvcArray([
						{ name: "ali", age: 24 },
						{ name: "reza", age: 25 },
						{ name: "saeed", age: 26 },
					 ],"person")
			output: [
						{ "person[0].name": "ali",   "person[0].age": 24 },
						{ "person[1].name": "reza",  "person[1].age": 25 },
						{ "person[2].name": "saeed", "person[2].age": 26 }
					]
	*/
	if (!w.Locust.Form.MvcArray) {
        w.Locust.Form.MvcArray = function (array, name) {
			var result = [];
			
			if (w.jQuery.isArray(array)) {
				array.forEach(function(x, i){
					var json = {};
					
					for (var key in Object.keys(x)) {
						if (x.hasOwnProperty(key)) {
							json[name + "[" + i + "]." + key] = x[key];
						}
					}
					
					result.push(json);
				});
			}
			
			return result;
		}
	}
	if (w.$f == undefined) {
		w.$f = w.Locust.Form;
	}
})(__locustMainContext);
