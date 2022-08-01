export function get_element_by_attribute(data, attr_name, attr_value) {

    let element = {}

    element = data.filter((element) => element[attr_name] == attr_value)

    return element['0']
    
}