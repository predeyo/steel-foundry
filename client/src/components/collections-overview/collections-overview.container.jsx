import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors.js";
import WithSpinner from "../with-spinner/with-spinner.component.jsx";

import CollectionsOverview from "./collections-overview.component.jsx";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

// NOTE: CollectionsOverviewContainer is same as:
// connect(mapStateToProps)(WithSpinner(CollectionsOverview))

export default CollectionsOverviewContainer;
