import IAlert from "./IAlert";
import IMeasure from "./IMeasure";

interface IOccurrence {
    measure_id?: IMeasure;
    alert_id?: IAlert;
}

export default IOccurrence;
