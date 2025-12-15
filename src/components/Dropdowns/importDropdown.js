



import GroupProjectFilter from "./../components/Dropdowns/GroupProjectFilter.js";
import useGroupProjectFilters from "./../components/Dropdowns/useGroupProjectFilters.js";
const { groupName, projectId, updateFilters } = useGroupProjectFilters();
<div className="page-header-with-filter">
    <h1 className="procurement-bills-received-title">
        Bills Received
        {/* <span className="procurement-bills-received-count">({bills.length})</span> */}
    </h1>
    <GroupProjectFilter
        groupValue={groupName}
        projectValue={projectId}
        onChange={updateFilters}
    />
</div>


