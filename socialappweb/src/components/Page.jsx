// import React from "react";
//
// export class Page extends React.Component {
//
//   render() {
//     HistoryExtension.install(this.props.history);
//
//     const Content = this.props.content;
//     const contentType = Content.contentType ? Content.contentType : 'default';
//
//     return (
//       <Fragment
//         {...this.services}
//         breadcrumbs={
//           <Breadcrumbs
//             location={this.props.location}
//             rules={BREADCRUMB_RULES}
//           />
//         }
//         content={
//           <ViewErrorBoundary logger={this.props.logger}>
//             <Content
//               {...this.props}
//               {...this.services} />
//             <FeedbackFragment apiService={this.props.apiService} metrics={this.props.metrics} />
//           </ViewErrorBoundary>}
//         contentType={contentType} />
//     );
//   }
// }
