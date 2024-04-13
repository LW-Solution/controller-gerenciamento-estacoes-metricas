import IAlert from "./IAlert";
import IMeasure from "./IMeasure";

interface IOccurrence {
    id_occurrence?: number;
    measure_id?: IMeasure;
    alert_id?: IAlert;
}

export default IOccurrence;
