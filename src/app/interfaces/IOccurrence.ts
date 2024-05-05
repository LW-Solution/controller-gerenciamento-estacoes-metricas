import IAlert from "./IAlert";
import IMeasure from "./IMeasure";

interface IOccurrence {
    id_occurrence?: number;
    alertIdAlert?: IAlert;
    status_alert?: number;
    measureIdMeasure?: IMeasure;
}

export default IOccurrence;
