export default function SkeletonLoader({ 
  type = 'card',
  count = 1 
}: { 
  type?: 'card' | 'image' | 'text' | 'gallery'
  count?: number 
}) {
  const renderSkeleton = () => {
    switch (type) {
      case 'gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 rounded-lg skeleton" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                  <div className="h-3 bg-gray-200 rounded skeleton w-1/2" />
                  <div className="h-4 bg-gray-200 rounded skeleton w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'card':
        return (
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg skeleton" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
              <div className="h-3 bg-gray-200 rounded skeleton w-full" />
              <div className="h-3 bg-gray-200 rounded skeleton w-5/6" />
            </div>
          </div>
        )
      
      case 'image':
        return <div className="aspect-[4/3] bg-gray-200 rounded-lg skeleton animate-pulse" />
      
      case 'text':
        return (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded skeleton w-full" />
            <div className="h-4 bg-gray-200 rounded skeleton w-5/6" />
            <div className="h-4 bg-gray-200 rounded skeleton w-4/6" />
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  )
}