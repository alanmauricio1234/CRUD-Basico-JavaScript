import { ListPersons } from "./model.js";
import { View } from "./view.js";

const view = new View();
const list = new ListPersons();
view.setListPersons(list);
view.setAlert('success');
view.setAlert('danger');
view.render();